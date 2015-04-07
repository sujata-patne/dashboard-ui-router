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
        required: true
    },
    billable_headcount:{
        type:Number,
        required:true
    },
    bench_strength:{
        type:Number,
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
});

mongoose.model("ProjectsHistory",ProjectsHistorySchema);
