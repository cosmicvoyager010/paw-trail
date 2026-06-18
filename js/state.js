export const state = {
  world: {
    totalKm: 0,
    zones: {
      home: { unlocked: true },
      park: { unlocked: false },
      forest: { unlocked: false },
      river: { unlocked: false }
    }
  },

  puppy: {
    mood: "RESTING",
    bond: 0
  },

  memory: []
};
