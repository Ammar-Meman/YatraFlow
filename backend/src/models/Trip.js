const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },

    description:{
        type:String,
    },

    location:{
        type:{
            type: String,
            enum: ["Point"]
        },
        coordinates: {
            type: [Number],
        },
    },

    cost: {
        type: Number,
    },

    duration:{
        type: Number,
    },

    scheduledAt: {
        type: Date,
        default: null
    },

    openingTime: {
        type: String,
    },

    closingTime:{
        type:String,
    },

    order:{
        type:Number,
        required: true,
    },
});

const stopSchema = new mongoose.Schema({
    cityId: {
        type: String,
        required: true,
    },

    startDate: {
        type: Date,
        required: true,
    },

    endDate:{
        type:Date,
        required: true,
    },

    order:{
        type: Number,
        required: true,
    },
    
    activities: {
        type: [activitySchema],
        default: [],
    },
});

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  startDate:{
    type: Date,
    required: true,
  },
  endDate:{
    type: Date,
    required: true,
  },
  coverImage:{
    type: String,
  },
  budget:{
    type:Number,
    default:0,
  },
  stops:{
    type: [stopSchema],
    default: [],
  },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Trip",tripSchema)
