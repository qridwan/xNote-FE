import { useEffect, useState } from 'react'

import RichTextEditor, {
	BaseKit,
	Blockquote,
	Bold,
	BulletList,
	Clear,
	Code,
	CodeBlock,
	Color,
	ColumnActionButton,
	Emoji,
	Excalidraw,
	ExportPdf,
	ExportWord,
	FontFamily,
	FontSize,
	FormatPainter,
	Heading,
	Highlight,
	History,
	HorizontalRule,
	Iframe,
	Image,
	ImageUpload,
	ImportWord,
	Indent,
	Italic,
	Katex,
	LineHeight,
	Link,
	MoreMark,
	OrderedList,
	SearchAndReplace,
	SlashCommand,
	Strike,
	Table,
	TableOfContents,
	TaskList,
	TextAlign,
	Underline,
	Video,
	VideoUpload,
} from 'reactjs-tiptap-editor'

const extensions = [
	BaseKit.configure({
		placeholder: {
			showOnlyCurrent: true,
		},
		characterCount: {
			limit: 50_000,
		},
	}),
	History,
	SearchAndReplace,
	TableOfContents,
	FormatPainter.configure({ spacer: true }),
	Clear,
	FontFamily,
	Heading.configure({ spacer: true }),
	FontSize,
	Bold,
	Italic,
	Underline,
	Strike,
	MoreMark,
	Katex,
	Emoji,
	Color.configure({ spacer: true }),
	Highlight,
	BulletList,
	OrderedList,
	TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
	Indent,
	LineHeight,
	TaskList.configure({
		spacer: true,
		taskItem: {
			nested: true,
		},
	}),
	Link,
	Image,
	ImageUpload.configure({
		upload: (files: File) => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(URL.createObjectURL(files))
				}, 500)
			})
		},
	}),
	Video,
	VideoUpload.configure({
		upload: (files: File[]) => {
			const f = files.map(file => ({
				src: URL.createObjectURL(file),
				alt: file.name,
			}))
			return Promise.resolve(f)
		},
	}),
	Blockquote,
	SlashCommand,
	HorizontalRule,
	Code.configure({
		toolbar: false,
	}),
	CodeBlock.configure({ defaultTheme: 'dracula' }),
	ColumnActionButton,
	Table,
	Iframe,
	ExportPdf.configure({ spacer: true }),
	ImportWord.configure({
		upload: (files: File[]) => {
			const f = files.map(file => ({
				src: URL.createObjectURL(file),
				alt: file.name,
			}))
			return Promise.resolve(f)
		},
	}),
	ExportWord,
	Excalidraw,
]

type Props = {
	content: string,
	onValueChange: (...args: any[]) => void,
	readonly?: boolean
}
function NoteTiptap({ content, onValueChange, readonly }: Props) {
	//   const [content, setContent] = useState()
	// const [theme, setTheme] = useState('light')
	const [disable, setDisable] = useState(readonly ? true : false);
	useEffect(() => {
		setDisable(readonly ? true : false);
	}, [readonly])

	return (
		<div
			className="p-[14px] flex flex-col w-full max-w-screen-lg gap-[10px] mx-[auto] my-0 "
			style={{
				// maxWidth: 1024,
				margin: '10px auto',
				border: 'none',
				outline: 'none'
			}}
		>
			{/* <div
        style={{
          display: 'flex',
          gap: '12px',
          marginTop: '20px',
          marginBottom: 10,
        }}
      >
        <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <button type="button" onClick={() => setDisable(!disable)}>{disable ? 'Editable' : 'Readonly'}</button>
      </div> */}

			<RichTextEditor
				output="html"
				hideToolbar={disable}
				dense
				content={content as any}
				onChangeContent={onValueChange}
				extensions={extensions}
				disabled={disable}
				dark={false}
			/>

			{/* {typeof content === 'string' && (
        <textarea
          style={{
            marginTop: 20,
            height: 500,
            width: '100%'
          }}
          readOnly
          value={content}
        />
      )} */}
		</div>
	)
}

export default NoteTiptap;

