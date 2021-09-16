import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { ReactMarkdownCustom, Link } from 'Components'
import matter from 'gray-matter'
import { MDDOC } from '../graphql/queries'
import { IMdDoc } from '../interfaces'
import device from '../device'

/**
 * Types
 */

interface IMdDocProps {
	mdDocId: string
	loadingChanged: (loading: boolean) => void
}

interface IMdDocData {
	mdDoc: IMdDoc
}

/**
 * Styled Component
 */

const MdDocHeaderContainer = styled.section`
	border-radius: var(--default-border-radius);
	padding: var(--container-gap-mobile);
	background: var(--lightGrey);
	margin-bottom: 3rem;
	@media ${device.mobile} {
		padding: 20px;
	}
`

export default ({ mdDocId, loadingChanged }: IMdDocProps) => {
	const { loading, error, data } = useQuery<IMdDocData>(MDDOC, {
		variables: { id: mdDocId },
	})
	const [markdown, setMarkdown] = useState('')
	const [mdDocLoading, setMdDocLoading] = useState(true)

	// when loading changed
	useEffect(() => {
		loadingChanged(loading)
		if (data && data.mdDoc) {
			fetch(data.mdDoc.mdRawUrl)
				.then(response => response.text())
				.then(result => {
					setMarkdown(matter(result).content)
					setMdDocLoading(false)
					loadingChanged(mdDocLoading)
				})
		}
	}, [loadingChanged, loading, mdDocLoading])

	// return nothing when we are loading or having an error
	if (mdDocLoading || error || !data) return null

	return (
		<>
			<MdDocHeaderContainer>
				Bron: <Link href={data.mdDoc.mdSourceUrl}>{data.mdDoc.author}</Link>
			</MdDocHeaderContainer>
			{!markdown.startsWith('#') && <h1>{data.mdDoc.title}</h1>}
			<ReactMarkdownCustom urlRoot={data.mdDoc.urlRoot} markdown={markdown} />
		</>
	)
}
