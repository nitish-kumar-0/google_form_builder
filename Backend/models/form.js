const mongoose = require("mongoose");

// Schema for a single question
const QuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        required: true,
        enum: ["short", "para", "mcq", "checkbox", "Dropdown"] //kind of constrain
    },

    options: {
        type: [String],
        default: []
    },

    required: {
        type: Boolean,
        default: false
    }
});

// Schema for a complete form
const FormSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
    
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    questions: [QuestionSchema]

}, {
    timestamps: true
});

// Model
const Form = mongoose.model("Form", FormSchema);

module.exports = Form;