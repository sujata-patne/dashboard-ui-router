/**
 * Created by sujatah on 3/30/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrganizationHistorySchema = new Schema({
    ref:{
        type:Schema.types.ObjectId,
        ref:'Organization'
    },
    name:{
        type:String,
        required:true
    },
    owners:[
        {
            type:Schema.types.ObjectId,
            ref:'Employee'
        }
    ],
    total_num_people:{
        type:Number,
        required:true
    },
    billable_headcount:{
        type:Number,
        required:true
    }
    ,
    bench_strength:{
        type:Number,
        required:true
    },
    updated:{
        type:Date,
        default:Date.now,
        required:true
    },
    updated_by:{
        type:Schema.types.ObjectId,


        ref:'Employee'
    },
    version_date:{
        type:Date,
        default:Date.now,
        required:true
    },
    action_taken:{
        type:String
    }
})

mongoose.model("OrganizationHistory",OrganizationHistorySchema);