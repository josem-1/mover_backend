import mongoose from "mongoose";

const watchEntrySchema = new mongoose.Schema({
	mediaId:{ 
		type: String, 
		required: true 
	},
	mediaType:{
		type: String, 
		enum: ['movie','tv'], //this is fir type of media, or tv shw
		required: true 
	},
	title:{ 
		type: String, 
		required: true
	},
	posterPath: {
		type: String}, 
	genres:[String],  
	director:String, 
	createdAt:{ 
		type: Date, 
		default: Date.now 
	}
});

  
const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	watchlist:[watchEntrySchema],//array
  	watchHistory:[watchEntrySchema]//second array, hella arrays, arrays on arrays on arrys
},{
	timestamps: true
});

//mongodb subdocuments seems kinda like 2 d arrys first but username,email, and password kinda jsut stay one dimensional, watchlist and watchistory expand into 2nd dimension

export const User = mongoose.model("User", userSchema);
