import React from 'react';
import { rtdb, auth } from './RTDB';
import { ref, set, update, exists, val, child, get, remove} from "firebase/database"
import { getID } from './ID';


/* 
 * writeNewUser()
 *
 * Writes a new user to the database based on the information
 * collected from Signup.js
 * @param email -> the email the user entered in signup.
 * @param name -> the name the user entered in signup.
 * @param phone -> the phone number the user entered in signup.
 * @param birthday -> the birthday the user entered in signup.
 * @param securityQuestion -> the security question the user chose in signup.
 * @param securityAnswer -> the answer the user entered in signup.
 */
export const writeNewUser = (email, name, phone,
														 birthday, securityQuestion, securityAnswer, selectedOne, selectedTwo,
														 selectedThree, selectedFour, selectedFive, selectedSix, selectedSeven,
														 selectedEight, selectedNine, selectedTen, selectedEleven, selectedTwelve,
														 selectedThirteen) => {
	const id = getID(email);

	const default_profile_picture = "https://firebasestorage.googleapis.com/v0/b/uniroom-fdcd7.appspot.com/o/default-profile-picture.jpeg?alt=media&token=5c5c586a-e822-4096-b6cd-52c34f41dc9b"


	// write the "Critical Information" data
	set(ref(rtdb, "users/" + id + "/Critical Information"), {
		email: email,
		name: name,
		phone: phone,
		birthday: birthday,
		securityQuestion: securityQuestion,
		securityAnswer: securityAnswer,
		ghost_mode: false
	});

	// write the "Profile" data
	set(ref(rtdb, "users/" + id + "/Profile"), {
		profile_name: name,
		year_in_school: "year", // change
		gender: "gender", // change
		bio: "bio", // change
		hometown: "hometown", // change
		major: "major", // change
		covid_vaccination_status: "vaccine" // change
	});
	set(ref(rtdb, "users/" + id + "/Profile/Images"), {
		profile_picture: default_profile_picture, 
	});
	set(ref(rtdb, "users/" + id + "/Profile/Social Media"), {
		instagram: "insta", // change
		facebook: "fb" // change
	});
	set(ref(rtdb, "users/" + id + "/Profile/Activities"), {
		activity_count: 0
	});

	// write the "Roomate Compatibility" data
	set(ref(rtdb, "users/" + id + "/Roommate Compatibility"), {
		has_people_over: selectedOne,
		is_clean: selectedTwo,
		week_bedtime: selectedThree,
		weekend_bedtime: selectedFour,
		drinks_alcohol: selectedFive,
		smokes: selectedSix,
		handle_chores: selectedSeven,
		has_car: selectedEight,
		wants_pets: selectedNine,
		introverted_or_extraverted: selectedTen,
		check_before_having_people_over: selectedEleven,
		joint_grocery_shopping: selectedTwelve,
		has_significant_other: selectedThirteen 
	});

	// write the "Match List" 
	set(ref(rtdb, "users/" + id + "/Match List"), {
		user_count: 0
	});

	// write the "Feed", "Swipe Left List", and "Swipe Right List"
	set(ref(rtdb, "users/" + id + "/Feed/Swipe Left List"), {
		user_count: 0
	});
	set(ref(rtdb, "users/" + id + "/Feed/Swipe Right List"), {
		user_count: 0
	});
} // writeNewUser()




/*
 * writeName()
 *
 * Writes a profile_name to the specified user in the RTDB
 * @param email_or_id -> the email or id specifying the user.
 * @param name -> the name that we will write to the database.
 */
export const writeProfileName = (email_or_id, name) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		profile_name: name
	});
} // writeName()




/*
 * writeProfilePicture()
 *
 * This function updates the uri for the profile picture in the RTDB.
 * @param email_or_id -> the email or id of the user who we are updating.
 * @param uri -> the uri of the image that we are going to update
 * 							 the profile picture to.
 */
export const writeProfilePicture = (email_or_id, uri) => {
	console.log("HERE1");
	// get the id
	const id = getID(email_or_id);

	// write the url to the database
	update(ref(rtdb, "users/" + id + "/Profile/Images"), {
		profile_picture: uri
	});
	console.log("HERE2");
} // writeProfilePicture()



/*
 *
 */
export const writeQuestionnaire = (email_or_id) => {

}