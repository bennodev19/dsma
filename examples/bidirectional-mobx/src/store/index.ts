import { makeAutoObservable, observable } from 'mobx';

class TimerStore {
  public seconds = 0;
  public isRunning = false;
  private timerRef: number | null = null;

  constructor() {
    makeAutoObservable(
      this,
      {
        seconds: observable,
        isRunning: observable,
      },
      { autoBind: true }
    );
  }

  public async incrementSeconds(amount = 0.1) {
    // Increment Seconds
    this.seconds += amount;

    // Fetch dummy Data
    if (this.seconds > 2) {
      const response = await fetch('/data.json');
      const parsedJson = await response.json();
      todosStore.setTodos(parsedJson);
    }
  }

  public toggleTimer() {
    this.isRunning = !this.isRunning;

    // Clear Interval
    if (this.timerRef != null) {
      clearInterval(this.timerRef);
      this.timerRef = null;
    }

    // Start Interval
    if (this.isRunning) this.timerRef = setInterval(this.incrementSeconds, 100);
  }
}

class TodosStore {
  public todos?: string[] = undefined;

  constructor() {
    makeAutoObservable(
      this,
      {
        todos: observable,
      },
      { autoBind: true }
    );
  }

  public setTodos(todos: string[]) {
    this.todos = todos;
  }
}

export const timerStore = new TimerStore();
export const todosStore = new TodosStore();
