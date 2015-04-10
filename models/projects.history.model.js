/**
 * Created by sujatah on 4/1/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ProjectsHistorySchema = new Schema({
    ref:{
        type:ObjectId,
        ref:'Project'
    },
    name:{
        type:String,
        required:true
    },
    owners:[
        {
            type: ObjectId,
            ref: 'Employee',
            required: false
        }
    ],
    belong_to:{
        type: ObjectId,
        ref: 'Organization',
        required: false
    },
    total_num_people:{
        type:Number,
        required: false
    },
    billable_headcount:{
        type:Number,
        required:false
    },
    bench_strength:{
        type:Number,
        required:false
    },
    employees:[
        {
            type:ObjectId,
            ref:'Employee'
        }
    ],
    red_days:{
        type:Number,
        default:0
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
});

mongoose.model("ProjectsHistory",ProjectsHistorySchema);
