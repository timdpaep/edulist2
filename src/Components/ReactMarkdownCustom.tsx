import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
	NormalComponents,
	SpecialComponents,
} from 'react-markdown/src/ast-to-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import styled from 'styled-components'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

/**
 * Interface
 */

interface IReactMarkdownCustom {
	markdown: string
}

/**
 * Styled Components
 */

const PreTag = styled.pre`
	border-radius: 5px;
`

const H2 = styled.h2`
	border-bottom: 1px solid var(--text-color);
	padding-bottom: 1rem;
`

const Code = styled.code`
	background-color: var(--lightGrey);
	border-radius: 3px;
	padding: 0.25rem 0.5rem;
`

const Li = styled.li`
	margin: 10px 0;
	&::before {
		width: 20px;
	}
	& p {
		margin: 0;
	}
	&::marker {
		color: var(--exercise-numbering-color);
		margin-right: 20px;
	}
`

const Ol = styled.ol`
	padding-left: 1em;
`

const Ul = styled.ul`
	padding-left: 1em;
`

export const ReactMarkdownCustom: React.FC<IReactMarkdownCustom> = ({
	markdown,
}: IReactMarkdownCustom) => {
	const components: Partial<NormalComponents & SpecialComponents> = {
		code: ({ inline, className, children, ...props }: any) => {
			const match = /language-(\w+)/.exec(className || '')
			if (!inline && match) {
				return (
					<SyntaxHighlighter
						style={a11yDark}
						language={match[1]}
						showLineNumbers
						showInlineLineNumbers
						wrapLines
						PreTag={PreTag}
						{...props}
					>
						{String(children).replace(/\n$/, '')}
					</SyntaxHighlighter>
				)
			}
			return (
				<Code className={className} {...props}>
					{children}
				</Code>
			)
		},
		li: ({ children }: any) => (
			<Li>
				<span>{children}</span>
			</Li>
		),
		h2: ({ children }: any) => <H2>{children}</H2>,
		ol: ({ children }: any) => <Ol>{children}</Ol>,
		ul: ({ children }: any) => <Ul>{children}</Ul>,
	}
	return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
}
