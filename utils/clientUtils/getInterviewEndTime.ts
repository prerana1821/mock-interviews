declare global {
  interface Date {
    addHours: (h: number) => Date;
  }
}

Date.prototype.addHours = function (h: number) {
  this.setHours(this.getHours() + h);
  return this;
};

export const getInterviewEndTime = (date: Date): Date => {
  return new Date(date).addHours(1);
};
