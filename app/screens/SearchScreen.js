import React, { useState } from "react";
import { SPIDERX_HEROKU } from "react-native-dotenv";
import axios from "axios";
import { withTheme } from "styled-components/native";
import {
	StatusBar,
	FlatList,
	ScrollView,
	View,
	TouchableOpacity
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import SkeletonContent from "react-native-skeleton-content";
import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import PopularSearches from "../components/PopularSearches";
import VerticalPreviewList from "../components/VerticalPreviewList";
import { slugifySearchterm } from "../utils";
import db from "../services/firebase";
import useDocs from "../hooks/useDocs";
import { GridSkeleton, CardSkeleton } from "../skeleton";

const SearchSchema = Yup.object().shape({
	searchterm: Yup.string().required().min(2).label("Searchterm")
});

const SearchScreen = ({ theme, navigation }) => {
	const [results, setResults] = useState([]);
	const [searchPerformed, setSearchPerformed] = useState(false);
	const searches = useDocs("scifi");

	const handleSearch = async searchterm => {
		db.collection("movies")
			.doc(searchterm)
			.onSnapshot(async doc => {
				if (doc.exists) {
					db.collection(`movies/${searchterm}/results`)
						.orderBy("imdb_score", "desc")
						.onSnapshot(snapshot => {
							const docs = [];
							snapshot.forEach(doc => docs.push(doc.data()));
							setResults(docs);
						});
				} else {
					const dataString = `project=default&spider=searchmovies&searchterm=${searchterm}`;
					const response = await axios.post(SPIDERX_HEROKU, dataString);
					console.log(response.data);
				}
			});
	};

	const formik = useFormik({
		initialValues: {
			searchterm: ""
		},
		validationSchema: SearchSchema,
		onSubmit: values => {
			setSearchPerformed(true);
			setResults([]);
			const searchterm = slugifySearchterm(values.searchterm);
			handleSearch(searchterm);
		}
	});

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: theme.bg, paddingHorizontal: 10 }}
		>
			<StatusBar />
			<AppText color={theme.green} padtop="true">
				Search Movies
			</AppText>

			<AppInput
				nospace="true"
				icon="search1"
				value={formik.values.Searchterm}
				onChangeText={formik.handleChange("searchterm")}
				placeholder="Mad Max"
				onSubmitEditing={formik.handleSubmit}
			/>

			{!searchPerformed && !searches.length ? (
				<CardSkeleton loading={!searches.length} />
			) : null}

			{!searchPerformed && searches.length ? (
				<PopularSearches searches={searches} navigation={navigation} />
			) : null}

			{searchPerformed && !results.length ? (
				<GridSkeleton loading={searchPerformed && !results.length} />
			) : null}

			{results.length ? (
				<VerticalPreviewList
					title="Search Results"
					movies={results}
					navigation={navigation}
				/>
			) : null}
		</ScrollView>
	);
};

export default withTheme(SearchScreen);
