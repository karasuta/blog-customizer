import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [pageState, setPageState] =
		useState<ArticleStateType>(defaultArticleState);
	const [draftState, setDraftState] =
		useState<ArticleStateType>(defaultArticleState);
	const handleFormChange = (update: Partial<ArticleStateType>) => {
		setDraftState((prev) => ({ ...prev, ...update }));
	};
	const handleApply = () => {
		setPageState(draftState);
	};
	const handleReset = () => {
		setDraftState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				state={draftState}
				onUpdate={handleFormChange}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
