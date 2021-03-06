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
														 birthday, gender, vaccinated, securityQuestion, securityAnswer, selectedOne, selectedTwo,
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
		bio: "",
		graduation_year: "", 
		major: "", 
		location: "", 
		preferred_number_of_roommates: "",
	});
	writeGender(auth.currentUser.email, gender);
	writeVaccinated(auth.currentUser.email, vaccinated);
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
 * writeProfilePicture()
 *
 * This function updates the uri for the profile picture in the RTDB.
 * @param email_or_id -> the email or id of the user who we are updating.
 * @param uri -> the uri of the image that we are going to update
 * 							 the profile picture to.
 */
export const writeProfilePicture = (email_or_id, uri) => {
	// get the id
	const id = getID(email_or_id);

	// write the url to the database
	update(ref(rtdb, "users/" + id + "/Profile/Images"), {
		profile_picture: uri
	});
} // writeProfilePicture()




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
 * writeBio()
 *
 * Writes a bio to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param name -> the bio that we will write to the database.
 */
export const writeBio = (email_or_id, bio) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		bio: bio
	});
} // writeBio()




/*
 * writeGraduationYear()
 *
 * Writes the graduation year to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param year -> the graduation year that we will write to the database.
 */
export const writeGraduationYear = (email_or_id, year) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		graduation_year: year
	});
} // writeGraduationYear()



/*
 * writeMajor()
 *
 * Writes the major to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param major -> the major that we will write to the database.
 */
export const writeMajor = (email_or_id, major) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		major: major
	});
} // writeMajor




/*
 * writeLocation()
 *
 * Writes the location to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param location -> the location of the user that we are writing to the database.
 */
export const writeLocation = (email_or_id, location) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		location: location
	});
} // writeLocation()





/*
 * writePreferredNumRoommates()
 *
 * Writes the preferred number of roommates to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param numRoommates -> the preferred number of roommates of the user
 * 												that we are writing to the database.
 */
export const writePreferredNumRoommates = (email_or_id, numRoommates) => {
	const id = getID(email_or_id);

	update(ref(rtdb, "users/" + id + "/Profile"), {
		preferred_number_of_roommates: numRoommates
	});
} // writePreferredNumRoommates()





/*
 * writeGender()
 *
 * Writes the gender to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param gender -> the selected number from the gender selection menu
 * 									1: Male
 * 									2: Female
 * 								  3: Other
 * 									4: Prefere not to say
 */
export const writeGender = (email_or_id, gender) => {
	const id = getID(email_or_id);

	// get the gender as a string
	var genderStr;
	if (gender == 1) {
		genderStr = "Male";
	}
	else if (gender == 2) {
		genderStr = "Female";
	}
	else if (gender == 3) {
		genderStr = "Other";
	}
	else {
		genderStr = "Prefer not to say";
	}

	update(ref(rtdb, "users/" + id + "/Profile"), {
		gender: genderStr
	});
} // writeGender()




/*
 * writeVaccinated()
 *
 * Writes the vaccination status to the specified user in the RTDB.
 * @param email_or_id -> the email or id specifying the user.
 * @param vaccinated -> the selected number from the vaccination status selection menu
 * 									1: No, I'm not vaccinated
 * 									2: Yes, I'm vaccinated 
 */
export const writeVaccinated = (email_or_id, vaccinated) => {
	const id = getID(email_or_id);

	// get the vaccination status as a string
	var vaccinatedStr;
	if (vaccinated == 1) {
		vaccinatedStr = "Not Vaccinated";
	}
	else {
		vaccinatedStr = "Vaccinated";
	}

	update(ref(rtdb, "users/" + id + "/Profile"), {
		covid_vaccination_status: vaccinatedStr
	});
} // writeGender()



/*
 * This function updates the questionnaire data in the RTDB.
 * @param email_or_id -> the email or id of the user
 * @param a<i> -> the answer for the i-th question.
 */
export const writeQuestionnaire = (email_or_id, a1, a2, a3, a4, a5, a6, a7, a8,
																   a9, a10, a11, a12, a13) => {
	// get the id
	const id = getID(email_or_id);

	// write each answer to the database
	update(ref(rtdb, "users/" + id + "/Roommate Compatibility/"), {
		has_people_over: a1,
		is_clean: a2,
		week_bedtime: a3,
		weekend_bedtime: a4,
		drinks_alcohol: a5,
		smokes: a6,
		handle_chores: a7,
		has_car: a8,
		wants_pets: a9,
		introverted_or_extraverted: a10,
		check_before_having_people_over: a11,
		joint_grocery_shopping: a12,
		has_significant_other: a13
	});
} // writeQuestionnaire

