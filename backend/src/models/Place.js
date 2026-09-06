const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    externalPlaceId: {
      type: String,
      required: true,
      unique: true,
    },

    provider: {
      type: String,
      required: true,
    },

    name:{
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    category: {
      type: String,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates:{
        type: [Number],
        required: true,
      },
    },

    openingHours: {
      available : {
        type : Boolean,
        required: true,
        default: false,
      },

      periods: {
        type: mongoose.Schema.Types.Mixed,
      },

      lastVerifiedAt: {
        type: Date,
      },
    },

    rating: {
      type: Number,
    },

    photoUrl: {
      type: String,
    },

    reportedIncorrectCount:{
      type: Boolean,
      default: false,
    },

    lastVerifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

placeSchema.index({location: "2dsphere"});

module.exports = mongoose.model("Place",placeSchema);