import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import styled from 'styled-components'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import { Link } from '.'

/**
 * Interface
 */

interface IReactMarkdownCustom {
	markdown: string
	urlRoot?: string
}

/**
 * Styled Components
 */

const PreTag = styled.pre`
	border-radius: 5px;
`

const P = styled.p`
	margin-top: 2em;
	margin-bottom: 2em;
`

const H2 = styled.h2`
	border-bottom: 1px solid var(--text-color);
	padding-bottom: 1rem;
`

const Code = styled.code`
	background-color: var(--lightGrey);
	border-radius: 3px;
	padding: 0.25rem 0.5rem;
	margin-bottom: 20px;
`

const Li = styled.li`
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

const BlockQuote = styled.blockquote`
	padding: 20px;
	background-color: var(--lightGrey);
	margin: 40px 0px;
	box-shadow: var(--level-2);
	& > p {
		margin: 0;
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
	urlRoot = '',
}: IReactMarkdownCustom) => {
	const components: Partial<any> = {
		code: ({ inline, className, children, ...props }: any) => {
			const match = /language-(\w+)/.exec(className || '')
			if (!inline && match) {
				return (
					<SyntaxHighlighter
						style={atomDark}
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
		h2: ({ id, children }: any) => <H2 id={id}>{children}</H2>,
		ol: ({ children }: any) => <Ol>{children}</Ol>,
		ul: ({ children }: any) => <Ul>{children}</Ul>,
		p: ({ children }: any) => <P>{children}</P>,
		blockquote: ({ children }: any) => <BlockQuote>{children}</BlockQuote>,
		a: (props: any) => {
			if (props.href.startsWith('http'))
				return <Link href={props.href}>{props.children}</Link>
			if (props.href.startsWith('#'))
				return (
					<Link target='_self' href={props.href}>
						{props.children}
					</Link>
				)
			if (urlRoot)
				return <Link href={`${urlRoot}${props.href}`}>{props.children}</Link>
			return <>{props.children}</>
		},
	}
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm, remarkSlug]}
			skipHtml
			components={components}
		>
			{markdown}
		</ReactMarkdown>
	)
}
