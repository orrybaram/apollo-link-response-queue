import {
  ApolloLink,
  Observable,
  Operation,
  FetchResult,
  NextLink
} from "apollo-link";
import { Observer } from "zen-observable-ts";

interface OperationQueueEntry {
  operation: Operation;
  forward: NextLink;
  observer: Observer<FetchResult>;
  subscription?: { unsubscribe: () => void };
}

export default class QueueLink extends ApolloLink {
  private operationQueue: OperationQueueEntry[] = [];

  public request(operation: Operation, forward: NextLink) {
    if (operation.getContext().queueResponse) {
      return new Observable(observer => {
        const operationEntry = { operation, forward, observer };
        this.enqueue(operationEntry);
        return () => this.cancelOperation(operationEntry);
      });
    }

    return forward(operation);
  }

  private cancelOperation(entry: OperationQueueEntry) {
    this.operationQueue = this.operationQueue.filter(e => e !== entry);
  }

  private enqueue(entry: OperationQueueEntry) {
    this.operationQueue.push(entry);
  }
}
