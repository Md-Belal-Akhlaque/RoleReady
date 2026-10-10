import mongoose from "mongoose";
/**
 * job description schema
 * resume text
 * self description
 * 
 * Technical question and answer : 
 *          [{ question: String,
 *             answer: String,
 *             intension: String,
 *             
 *          }]
 * 
 * Behavioral question and answer : 
 *          [{ question: String,
 *             answer: String,
 *             intension: String,
 *             
 *          }]
 * 
 * skill gaps: [{
 *           skill: String,
 *           gap: String,
 *           severity:{
 *              type: String,
 *              enum: ["low", "medium", "high"]
 *                    }
 *          }]
 * 
 * preparation plan :[{
 *         day: number,
 *         plan: String,
 *         task: [],
 *         focus:[String]
 *          }]
 * 
 * matchScore:String
 * 
 */

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required: [true, "question is required"]
    },
    answer:{
        type:String,
        required: [true, "answer is required"]
    },
    intension:{
        type:String,
        required: [true, "intension is required"]
    }
},{_id:false})

const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required: [true, "question is required"]
    },
    answer:{
        type:String,
        required: [true, "answer is required"]
    },
    intension:{
        type:String,
        required: [true, "intension is required"]
    }
},{_id:false})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required: [true, "skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required: [true, "severity is required"]
    }
},{_id:false})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required: [true, "day is required"]
    },
    focus:{
        type:[String],
        required: [true, "focus is required"]
    },
    task:[{
        type:String,
        required:[true,"task is reqired"]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type: String,
        required: [true, "job description is required"]
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100,
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: [true, "user is required"]
    },
    title:{
        type:String,
        required: [true, "job title is required"]
    }

},{timestamp:true})

const interviewReport = new mongoose.model("interview Report",interviewReportSchema);

export default interviewReport;