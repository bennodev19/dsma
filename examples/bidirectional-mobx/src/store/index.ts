import { makeAutoObservable, observable } from 'mobx';

class ApplicationStore {
  public seconds = 0;
  public running = false;
  public todos?: string[] = undefined;
  private timerRef: number | null = null;

  constructor() {
    makeAutoObservable(
      this,
      {
        seconds: observable,
        running: observable,
        todos: observable,
      },
      { autoBind: true }
    );
  }

  public toggleTimer() {
    this.running = !this.running;

    // Clear Interval
    if (this.timerRef != null) {
      clearInterval(this.timerRef);
      this.timerRef = null;
    }

    // Start Interval
    if (this.running) this.timerRef = setInterval(this.incrementSeconds, 100);
  }

  public async incrementSeconds() {
    // Increment Seconds
    this.seconds += 0.1;

    // Fetch dummy Data
    if (this.seconds > 2) {
      const response = await fetch('/data.json');
      const parsedJson = await response.json();
      this.todos = parsedJson;
    }
  }
}

const store = new ApplicationStore();

export default store;
