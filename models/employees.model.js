/**
 * Created by sujatah on 2/5/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var EmployeesSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    year_exp:{
        type:Number,
        required:true
    },
    belong_to:[
        {
            type: ObjectId,
            ref: 'Organization',
            required: false
        }
    ],
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
    }
})

mongoose.model('Employee',EmployeesSchema);
