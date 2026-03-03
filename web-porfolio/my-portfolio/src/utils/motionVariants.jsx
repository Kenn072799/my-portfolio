export const staggerContainer = (stagger = 0.15) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

export const fadeUpItem = (distance = 40) => ({
  hidden: { opacity: 0, y: distance },
  show: { opacity: 1, y: 0 },
});
