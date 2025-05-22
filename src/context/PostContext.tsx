import React, { createContext, useContext } from 'react';
import postService, { Post } from '../services/postService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface PostContextType {
    posts: Post[];
    currentPost: Post | null;
    isLoading: boolean;
    error: string | null;
    refetchPosts: () => void;
    getPostById: (id: number) => Promise<Post | undefined>;
    getPostsByCommunity: (communityId: number) => Promise<Post[] | undefined>;
    getPostsByCommunityOrderByDate: (communityId: number) => Promise<Post[] | undefined>;
    getPostsByCommunityOrderByLikes: (communityId: number) => Promise<Post[] | undefined>;
    createPost: (post: Partial<Post> | FormData) => Promise<Post | undefined>;
    updatePost: (id: number, post: Partial<Post>) => Promise<Post | undefined>;
    deletePost: (id: number) => Promise<void>;
    likePost: (id: number) => Promise<Post | undefined>;
    unlikePost: (id: number) => Promise<Post | undefined>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();

    // Queries
    const { data: posts = [], isLoading, error, refetch } = useQuery<Post[], Error>(['posts'], postService.getAllPosts);

    // Mutations
    const createMutation = useMutation(postService.createPost, {
        onSuccess: () => queryClient.invalidateQueries(['posts'])
    });
    const updateMutation = useMutation(({ id, post }: { id: number, post: Partial<Post> }) => postService.updatePost(id, post), {
        onSuccess: () => queryClient.invalidateQueries(['posts'])
    });
    const deleteMutation = useMutation((id: number) => postService.deletePost(id), {
        onSuccess: () => queryClient.invalidateQueries(['posts'])
    });
    const likeMutation = useMutation((id: number) => postService.likePost(id), {
        onSuccess: () => queryClient.invalidateQueries(['posts'])
    });
    const unlikeMutation = useMutation((id: number) => postService.unlikePost(id), {
        onSuccess: () => queryClient.invalidateQueries(['posts'])
    });

    // Métodos auxiliares para queries individuales
    const getPostById = async (id: number) => {
        try {
            return await postService.getPostById(id);
        } catch {
            return undefined;
        }
    };
    const getPostsByCommunity = async (communityId: number) => {
        try {
            return await postService.getPostsByCommunity(communityId);
        } catch {
            return undefined;
        }
    };
    const getPostsByCommunityOrderByDate = async (communityId: number) => {
        try {
            return await postService.getPostsByCommunityOrderByDate(communityId);
        } catch {
            return undefined;
        }
    };
    const getPostsByCommunityOrderByLikes = async (communityId: number) => {
        try {
            return await postService.getPostsByCommunityOrderByLikes(communityId);
        } catch {
            return undefined;
        }
    };

    // Métodos auxiliares para mutaciones
    const createPost = async (post: Partial<Post> | FormData) => {
        try {
            const data = await createMutation.mutateAsync(post);
            return data;
        } catch {
            return undefined;
        }
    };
    const updatePost = async (id: number, post: Partial<Post>) => {
        try {
            const data = await updateMutation.mutateAsync({ id, post });
            return data;
        } catch {
            return undefined;
        }
    };
    const deletePost = async (id: number) => {
        await deleteMutation.mutateAsync(id);
    };
    const likePost = async (id: number) => {
        try {
            const data = await likeMutation.mutateAsync(id);
            return data;
        } catch {
            return undefined;
        }
    };
    const unlikePost = async (id: number) => {
        try {
            const data = await unlikeMutation.mutateAsync(id);
            return data;
        } catch {
            return undefined;
        }
    };

    return (
        <PostContext.Provider value={{
            posts,
            currentPost: null, // Puedes agregar lógica para esto si lo necesitas
            isLoading,
            error: error ? error.message : null,
            refetchPosts: refetch,
            getPostById,
            getPostsByCommunity,
            getPostsByCommunityOrderByDate,
            getPostsByCommunityOrderByLikes,
            createPost,
            updatePost,
            deletePost,
            likePost,
            unlikePost
        }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePost = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePost debe ser usado dentro de un PostProvider');
    }
    return context;
};