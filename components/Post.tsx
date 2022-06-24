import React, { useEffect, useState } from 'react';
import 
    { 
        ArrowUpIcon, ArrowDownIcon, ChatAltIcon, GiftIcon, ShareIcon, BookmarkIcon, DotsHorizontalIcon
    } 
from '@heroicons/react/outline';
import Avatar from './Avatar';
import TimeAgo from 'react-timeago';
import Link from 'next/link';
import { ThreeBody } from '@uiball/loaders';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { GET_ALL_VOTES_BY_POST_ID } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_VOTE } from '../graphql/mutations';

type Props = {
    post: Post
}

function Post({ post }: Props) {
    const [vote, setVote] = useState<boolean>();
    const { data: session } = useSession();

    const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
        variables: {
            post_id: post?.id
        }
    });
    
    const [addVote] = useMutation(ADD_VOTE, {
        refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVotesByPostId"]
    });
    
    const upVote = async (isUpvote: boolean) => {
        if(!session) {
            toast("You need to sign in to Vote❗")
            return;
        };

        if(vote && isUpvote) return;
        if(vote === false && !isUpvote) return;

        console.log('voting...', isUpvote);

        const { data: { insertVote: newVote }} = await addVote({
            variables: {
                post_id: post.id,
                username: session.user?.name,
                upvote: isUpvote
            }
        })
    };

    useEffect(() => {
        const votes: Vote[] = data?.getVotesByPostId;
        const vote = votes?.find(vote => vote.username == session?.user?.name)?.upvote;
        setVote(vote);
    }, [data]);

    const displayVotes = (data: any) => {
        const votes: Vote[] = data?.getVotesByPostId;
        const displayNumber = votes?.reduce((sum, vote) => vote.upvote ? sum += 1 : sum -= 1, 0);

        if (votes?.length === 0) return 0;

        if (displayNumber === 0) {
            return votes[0]?.upvote ? 1 : -1;
        };

        return displayNumber;
    }


    if(!post) return (
        <div className="flex w-full items-center justify-center p-10 text-xl">
            <ThreeBody size={50} color="#FF4501" />
        </div>
    );

    return (
        <Link href={`/post/${post.id}`}>
            <div className="flex rounded-sm cursor-pointer border border-gray-300 bg-white shadow-sm hover:border-gray-400">
                <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
                    <ArrowUpIcon onClick={() => upVote(true)} className={`voteButtons hover:text-red-500 ${vote && 'text-red-400 font-semibold'}`} />
                    <p className="text-black font-bold text-xs">{displayVotes(data)}</p>
                    <ArrowDownIcon onClick={() => upVote(false)} className={`voteButtons hover:text-blue-400 ${vote === false && 'text-blue-400 font-semibold'}`} />
                </div>

                <div className="p-3 pb-1">
                    <div className="flex items-center space-x-2">
                        <Avatar seed={post.subreddit[0]?.topic} />
                        <p className="text-xs text-gray-400">
                            <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                                <span className="font-bold text-black hover:text-blue-400 hover:underline">r/{post.subreddit[0]?.topic}</span> 
                            </Link> • Posted by u/{post.username} <TimeAgo date={post.created_at} />
                        </p>
                    </div>

                    <div className="py-4">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="mt-2 text-sm">{post.body}</p>
                    </div>

                    <img className="w-full rounded-md" src={post.image} alt="" />

                    <div className="flex space-x-4 text-gray-400">
                        <div className="postButtons">
                            <ChatAltIcon className="postIcons" />
                            <p>{post.comments.length} Comments</p>
                        </div>
                        <div className="postButtons">
                            <GiftIcon className="postIcons" />
                            <p className="hidden sm:inline">Award</p>
                        </div>
                        <div className="postButtons">
                            <ShareIcon className="postIcons" />
                            <p className="hidden sm:inline">Share</p>
                        </div>
                        <div className="postButtons">
                            <BookmarkIcon className="postIcons" />
                            <p className="hidden sm:inline">Save</p>
                        </div>
                        <div className="postButtons">
                            <DotsHorizontalIcon className="postIcons" />
                        </div>
                    </div>
                </div>


            </div>
        </Link>
    )
}

export default Post;
