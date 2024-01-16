import Promise from 'bluebird';
export const initialSync = async (cb: (milestone: number) => void) => {
  // NOTE: we simulate a long ongoing API call and cb on each milestone
  const milestones = [0, 25, 50, 75, 100];
  return Promise.each(milestones, (milestone) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        cb(milestone);
        resolve();
      }, 1000);
    });
  });
};
