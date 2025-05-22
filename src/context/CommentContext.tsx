import React, { createContext, useContext } from 'react';
import commentService, { Comment } from '../services/commentService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface CommentContextType {
    comments: Comment[];
    currentComment: Comment | null;
    isLoading: boolean;
    error: string | null;
    refetchComments: () => void;
    getCommentById: (id: number) => Promise<Comment | undefined>;
    getCommentsByPost: (postId: number) => Promise<Comment[] | undefined>;
    getCommentsByPostOrderByDate: (postId: number) => Promise<Comment[] | undefined>;
    createComment: (comment: Partial<Comment>) => Promise<Comment | undefined>;
    updateComment: (id: number, comment: Partial<Comment>) => Promise<Comment | undefined>;
    deleteComment: (id: number) => Promise<void>;
    likeComment: (id: number) => Promise<Comment | undefined>;
    unlikeComment: (id: number) => Promise<Comment | undefined>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();

    // Queries
    const { data: comments = [], isLoading, error, refetch } = useQuery<Comment[], Error>(['comments'], commentService.getAllComments);

    // Mutations
    const createMutation = useMutation(commentService.createComment, {
        onSuccess: () => queryClient.invalidateQueries(['comments'])
    });
    const updateMutation = useMutation(({ id, comment }: { id: number, comment: Partial<Comment> }) => commentService.updateComment(id, comment), {
        onSuccess: () => queryClient.invalidateQueries(['comments'])
    });
    const deleteMutation = useMutation((id: number) => commentService.deleteComment(id), {
        onSuccess: () => queryClient.invalidateQueries(['comments'])
    });
    const likeMutation = useMutation((id: number) => commentService.likeComment(id), {
        onSuccess: () => queryClient.invalidateQueries(['comments'])
    });
    const unlikeMutation = useMutation((id: number) => commentService.unlikeComment(id), {
        onSuccess: () => queryClient.invalidateQueries(['comments'])
    });

    // Métodos auxiliares para queries individuales
    const getCommentById = async (id: number) => {
        try {
            return await commentService.getCommentById(id);
        } catch {
            return undefined;
        }
    };
    const getCommentsByPost = async (postId: number) => {
        try {
            return await commentService.getCommentsByPost(postId);
        } catch {
            return undefined;
        }
    };
    const getCommentsByPostOrderByDate = async (postId: number) => {
        try {
            return await commentService.getCommentsByPostOrderByDate(postId);
        } catch {
            return undefined;
        }
    };

    // Métodos auxiliares para mutaciones
    const createComment = async (comment: Partial<Comment>) => {
        try {
            const data = await createMutation.mutateAsync(comment);
            return data;
        } catch {
            return undefined;
        }
    };
    const updateComment = async (id: number, comment: Partial<Comment>) => {
        try {
            const data = await updateMutation.mutateAsync({ id, comment });
            return data;
        } catch {
            return undefined;
        }
    };
    const deleteComment = async (id: number) => {
        await deleteMutation.mutateAsync(id);
    };
    const likeComment = async (id: number) => {
        try {
            const data = await likeMutation.mutateAsync(id);
            return data;
        } catch {
            return undefined;
        }
    };
    const unlikeComment = async (id: number) => {
        try {
            const data = await unlikeMutation.mutateAsync(id);
            return data;
        } catch {
            return undefined;
        }
    };

    return (
        <CommentContext.Provider value={{
            comments,
            currentComment: null, // Puedes agregar lógica para esto si lo necesitas
            isLoading,
            error: error ? error.message : null,
            refetchComments: refetch,
            getCommentById,
            getCommentsByPost,
            getCommentsByPostOrderByDate,
            createComment,
            updateComment,
            deleteComment,
            likeComment,
            unlikeComment
        }}>
            {children}
        </CommentContext.Provider>
    );
};

export const useComment = () => {
    const context = useContext(CommentContext);
    if (context === undefined) {
        throw new Error('useComment debe ser usado dentro de un CommentProvider');
    }
    return context;
};