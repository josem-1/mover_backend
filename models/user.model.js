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
		type: String}, //posterpath is photo in the tmdb api. why tf do they call it poster, i hate this api iioiiiiihojhhiojfhiahafioafeafe
	genres:[String],  //for now pull genres with api but maybe later on keep track of them in mongogogo db, idk fo r now api might be better
	//genre's has to be an array, do not go back to not using an arry, stupid api
	director:String, //who freaking care about the director???????????
	createdAt:{ 
		type: Date, 
		default: Date.now //if date.now donest work, then im suing w3 
	}//this could be a nice detail but if mongodb trips up bcuz of this, its getting cut, idc. 
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
  	watchHistory:[watchEntrySchema]//second array, hella arrays, arrays on arrays on arrys,,, not really tho
},{
	timestamps: true
});

//mongodb subdocuments seems kinda like 2 d arrys first but username,email, and password kinda jsut stay one dimensional, watchlist and watchistory expand into 2nd dimension

export const User = mongoose.model("User", userSchema);