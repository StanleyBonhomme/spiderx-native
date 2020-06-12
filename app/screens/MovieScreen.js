import React, { useState, useEffect, useContext } from "react";
import { SPIDERX_HEROKU } from "react-native-dotenv";
import axios from "axios";
import { withTheme } from "styled-components/native";
import {
	ScrollView,
	StatusBar,
	View,
	Image,
	StyleSheet,
	ToastAndroid,
	Dimensions,
	TouchableOpacity
} from "react-native";
import { AuthContext } from "../../App.js";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import db from "../services/firebase";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import PreviewList from "../components/PreviewList";
import useDocs from "../hooks/useDocs";
import {
	intersectGenre,
	getYtVideoId,
	getYear,
	pickRandomGenre
} from "../utils";
import { GenreSkeleton } from "../skeleton";

const MovieScreen = ({ route, navigation, theme }) => {
	const { userToken } = useContext(AuthContext);
	const [showAdd, setShowAdd] = useState(false);

	const {
		title,
		description,
		duration,
		genres,
		year,
		imdb_score,
		trailer,
		slug
	} = route.params;

	const intersectedGenres = intersectGenre(genres);
	const randomGenre = pickRandomGenre(intersectedGenres);
	const similarmovies = useDocs(randomGenre);

	useEffect(() => {
		db.collection(`users/${userToken}/movies`)
			.doc(slug)
			.get()
			.then(doc => {
				if (doc.exists) {
					setShowAdd(false);
				} else {
					setShowAdd(true);
				}
			});
	}, [slug]);

	const addToList = async slug => {
		const response = await db
			.collection(`users/${userToken}/movies`)
			.doc(slug)
			.set(route.params);
		console.log(response);
	};

	const playMovie = () => {
		db.collection("videolinks")
			.doc(slug)
			.onSnapshot(async doc => {
				if (doc.exists) {
					const { iframe_video_link, jw_video_link } = doc.data();

					console.log({ iframe_video_link, jw_video_link });

					if (jw_video_link || iframe_video_link) {
						navigation.navigate("MovieStack", {
							screen: "PlayMovie",
							params: {
								jw_video_link,
								iframe_video_link
							}
						});
					} else if (jw_video_link === null && iframe_video_link === "") {
						ToastAndroid.show(
							"The movie is not available yet, sorry for the inconvenience",
							ToastAndroid.SHORT
						);
					}
				} else {
					ToastAndroid.show(
						"Scraping has begun. This may take a minute or two depending on your connection",
						ToastAndroid.LONG
					);
					const dataString = `project=default&spider=videolink&slug=${slug}`;
					const response = await axios.post(SPIDERX_HEROKU, dataString);
					console.log(response.data);
				}
			});
	};

	return (
		<ScrollView style={styles.container}>
			<StatusBar />
			<YoutubePlayer
				style={{ margin: 0 }}
				width={Dimensions.get("window").width}
				height={220}
				videoId={getYtVideoId(trailer)}
			/>

			<TouchableOpacity style={styles.play} onPress={() => playMovie()}>
				<AntDesign name="play" color={theme.accentColor} size={35} />
			</TouchableOpacity>

			<View style={styles.infoContainer}>
				<View style={{ width: "80%" }}>
					<AppText size={16}>{title}</AppText>
				</View>

				<View style={{ flexDirection: "row", paddingTop: 2 }}>
					<AppText color={theme.secondaryColor} size={15}>
						{getYear(year)}{" "}
					</AppText>
					<AppText color={theme.secondaryColor} size={15}>
						{duration}
					</AppText>

					<View style={styles.rating}>
						<AppText color={theme.secondaryColor} size={15}>
							{imdb_score}
						</AppText>
						<FontAwesome
							style={{ marginLeft: 5, position: "relative", top: 2 }}
							name="star"
							color={theme.gold}
							size={18}
						/>
					</View>
				</View>

				<AppText size={14} pad="true">
					{description}
				</AppText>

				<View style={styles.genres}>
					{genres.slice(0, 2).map(genre => (
						<AppButton
							key={genre}
							title={genre}
							background={theme.grey}
							size={14}
							bg={theme.grey}
						/>
					))}
					{showAdd ? (
						<AppButton
							onPress={() => addToList(slug)}
							title="Add"
							background={theme.grey}
							size={14}
							bg={theme.grey}
						/>
					) : null}
				</View>

				{!similarmovies.length ? (
					<GenreSkeleton loading={!similarmovies.length} />
				) : null}
				{similarmovies.length ? (
					<PreviewList
						title="Similar Movies"
						movies={similarmovies}
						navigation={navigation}
					/>
				) : null}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#212430"
	},
	play: {
		position: "absolute",
		top: 235,
		left: 320,
		zIndex: 96
	},
	infoContainer: {
		paddingHorizontal: 10,
		paddingTop: 20
	},
	genres: {
		flexDirection: "row"
	},
	rating: {
		marginLeft: 10,
		flexDirection: "row"
	},
	addToList: {
		position: "relative",
		left: 6,
		top: 6,
		zIndex: 95
	}
});

export default withTheme(MovieScreen);
