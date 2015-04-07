/**
 * Created by sujatah on 2/5/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var EmployeesHistorySchema = new Schema({
    ref:{
        type:ObjectId,
        ref:'Employee'
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    skills:[
        {
            name:String
        }
    ],
    year_exp:{
        type:Number,
        required:true
    },
    belong_to:{
        type: ObjectId,
        ref: 'Organization',
        required: false
    },
    works_for:[
        {
            type: ObjectId,
            ref: 'Project',
            required: false
        }
    ],
    billability:{
        type:Number,
        required:true
    },
    billable:{
        type:Boolean
    },
    role:{
      type:String,
      required:true
    },
    updated_by:{
        type: ObjectId,
        ref: 'Employee',
        required: false
    },
    version_date:{
        type:Date,
        default:Date.now,
        required:true
    }
})

mongoose.model('EmployeesHistory',EmployeesHistorySchema);
