import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	contentWidthArr,
	backgroundColors,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
interface ArticleParamsFormProps {
	state: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	state,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const [draftState, setDraftState] = useState<ArticleStateType>(state);

	const handleFormChange = (update: Partial<ArticleStateType>) => {
		setDraftState((prev) => ({ ...prev, ...update }));
	};
	const handleApply = () => {
		onApply(draftState);
	};
	const handleReset = () => {
		setDraftState(defaultArticleState);
	};

	const toggle = () => {
		setIsOpen((prev) => !prev);
	};

	const close = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		if (!isOpen || !containerRef.current) return;

		const container = containerRef.current;
		const handleClickOutside = (event: MouseEvent) => {
			if (!container.contains(event.target as Node)) {
				close();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div ref={containerRef}>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				className={clsx(styles.container, isOpen && styles['container_open'])}
				role='dialog'
				aria-modal={isOpen}
				aria-label='Настройки статьи'>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={draftState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							handleFormChange({ fontFamilyOption: option })
						}
					/>
					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={draftState.fontSizeOption}
						onChange={(option) => handleFormChange({ fontSizeOption: option })}
					/>
					<Select
						title='Цвет текста'
						selected={draftState.fontColor}
						options={fontColors}
						onChange={(option) => handleFormChange({ fontColor: option })}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={draftState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleFormChange({ backgroundColor: option })}
					/>
					<Select
						title='Ширина контента'
						selected={draftState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleFormChange({ contentWidth: option })}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
