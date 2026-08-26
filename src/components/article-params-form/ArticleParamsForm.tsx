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
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
interface ArticleParamsFormProps {
	state: ArticleStateType;
	onUpdate: (update: Partial<ArticleStateType>) => void;
	onApply: () => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	state,
	onUpdate,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

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
			{isOpen && (
				<aside
					className={clsx(styles.container, isOpen && styles['container_open'])}
					role='dialog'
					aria-modal='true'
					aria-label='Настройки статьи'>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							onApply();
						}}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							title='Шрифт'
							selected={state.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) => onUpdate({ fontFamilyOption: option })}
						/>
						<RadioGroup
							name='font-size'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={state.fontSizeOption}
							onChange={(option) => onUpdate({ fontSizeOption: option })}
						/>
						<Select
							title='Цвет текста'
							selected={state.fontColor}
							options={fontColors}
							onChange={(option) => onUpdate({ fontColor: option })}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={state.backgroundColor}
							options={backgroundColors}
							onChange={(option) => onUpdate({ backgroundColor: option })}
						/>
						<Select
							title='Ширина контента'
							selected={state.contentWidth}
							options={contentWidthArr}
							onChange={(option) => onUpdate({ contentWidth: option })}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='clear' onClick={onReset} />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</div>
	);
};
