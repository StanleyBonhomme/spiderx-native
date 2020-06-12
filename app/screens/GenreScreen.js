import React, { useEffect, useState } from "react";
import { withTheme } from "styled-components/native";
import { StatusBar, ScrollView } from "react-native";
import db from "../services/firebase";
import AppText from "../components/AppText";
import PreviewList from "../components/PreviewList";
import { GenreScreenSkeleton } from "../skeleton";

const useDocs = genre => {
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		db.collection(`genres/${genre}/results`)
			.orderBy("imdb_score", "desc")
			.limit(10)
			.get()
			.then(snapshot => {
				const docs = [];
				snapshot.forEach(doc => docs.push(doc.data()));
				setDocs(docs);
			});
	}, []);

	return docs;
};

const GenreScreen = ({ navigation, theme }) => {
	const action = useDocs("action");
	const animation = useDocs("animation");
	const comedy = useDocs("comedy");
	const crime = useDocs("crime");
	const drama = useDocs("drama");
	const war = useDocs("war");
	const documentary = useDocs("documentary");
	const horror = useDocs("horror");
	const mystery = useDocs("mystery");
	const thriller = useDocs("thriller");
	const scifi = useDocs("scifi");
	const adventure = useDocs("adventure");

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: theme.bg, paddingHorizontal: 10 }}
		>
			{!action.length &&
			!animation.length &&
			!comedy.length &&
			!drama.length &&
			!war.length &&
			!documentary.length &&
			!horror.length &&
			!mystery.length &&
			!thriller.length &&
			!scifi.length &&
			!adventure.length ? (
				<GenreScreenSkeleton
					loading={
						!action.length &&
						!animation.length &&
						!comedy.length &&
						!drama.length &&
						!war.length &&
						!documentary.length &&
						!horror.length &&
						!mystery.length &&
						!thriller.length &&
						!scifi.length &&
						!adventure.length
					}
				/>
			) : null}

			<StatusBar />
			{action.length &&
			animation.length &&
			comedy.length &&
			drama.length &&
			war.length &&
			documentary.length &&
			horror.length &&
			mystery.length &&
			thriller.length &&
			scifi.length &&
			adventure.length ? (
				<>
					<PreviewList title="Action" movies={action} navigation={navigation} />
					<PreviewList
						title="Animation"
						movies={animation}
						navigation={navigation}
					/>
					<PreviewList title="Comedy" movies={comedy} navigation={navigation} />
					<PreviewList title="Crime" movies={crime} navigation={navigation} />
					<PreviewList title="Drama" movies={drama} navigation={navigation} />
					<PreviewList title="War" movies={war} navigation={navigation} />
					<PreviewList
						title="Documentary"
						movies={documentary}
						navigation={navigation}
					/>
					<PreviewList title="Horror" movies={horror} navigation={navigation} />
					<PreviewList
						title="Mystery"
						movies={mystery}
						navigation={navigation}
					/>
					<PreviewList title="Scifi" movies={scifi} navigation={navigation} />
					<PreviewList
						title="Adventure"
						movies={adventure}
						navigation={navigation}
					/>
					<PreviewList
						title="Thriller"
						movies={thriller}
						navigation={navigation}
					/>
				</>
			) : null}
		</ScrollView>
	);
};

export default withTheme(GenreScreen);
