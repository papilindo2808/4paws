import React, { createContext, useContext } from 'react';
import communityService, { Community } from '../services/communityService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface CommunityContextType {
    communities: Community[];
    currentCommunity: Community | null;
    isLoading: boolean;
    error: string | null;
    refetchCommunities: () => void;
    getCommunityById: (id: number) => Promise<Community | undefined>;
    getCommunitiesByCategory: (category: string) => Promise<Community[] | undefined>;
    searchCommunities: (name: string) => Promise<Community[] | undefined>;
    createCommunity: (community: Partial<Community> | FormData) => Promise<Community | undefined>;
    updateCommunity: (id: number, community: Partial<Community>) => Promise<Community | undefined>;
    deleteCommunity: (id: number) => Promise<void>;
    followCommunity: (id: number) => Promise<Community | undefined>;
    unfollowCommunity: (id: number) => Promise<Community | undefined>;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();
    const [currentCommunity, setCurrentCommunity] = React.useState<Community | null>(null);

    // Queries
    const { data: communities = [], isLoading, error, refetch } = useQuery<Community[], Error>(['communities'], communityService.getAllCommunities);

    // Mutations
    const createMutation = useMutation(communityService.createCommunity, {
        onSuccess: () => queryClient.invalidateQueries(['communities'])
    });
    const updateMutation = useMutation(({ id, community }: { id: number, community: Partial<Community> }) => communityService.updateCommunity(id, community), {
        onSuccess: () => queryClient.invalidateQueries(['communities'])
    });
    const deleteMutation = useMutation((id: number) => communityService.deleteCommunity(id), {
        onSuccess: () => queryClient.invalidateQueries(['communities'])
    });
    const followMutation = useMutation((id: number) => communityService.followCommunity(id), {
        onSuccess: () => queryClient.invalidateQueries(['communities'])
    });
    const unfollowMutation = useMutation((id: number) => communityService.unfollowCommunity(id), {
        onSuccess: () => queryClient.invalidateQueries(['communities'])
    });

    // Métodos auxiliares para queries individuales
    const getCommunityById = async (id: number) => {
        try {
            const community = await communityService.getCommunityById(id);
            setCurrentCommunity(community);
            return community;
        } catch {
            setCurrentCommunity(null);
            return undefined;
        }
    };
    const getCommunitiesByCategory = async (category: string) => {
        try {
            return await communityService.getCommunitiesByCategory(category);
        } catch {
            return undefined;
        }
    };
    const searchCommunities = async (name: string) => {
        try {
            return await communityService.searchCommunities(name);
        } catch {
            return undefined;
        }
    };

    // Métodos auxiliares para mutaciones
    const createCommunity = async (community: Partial<Community> | FormData) => {
        try {
            const data = await createMutation.mutateAsync(community);
            return data;
        } catch {
            return undefined;
        }
    };
    const updateCommunity = async (id: number, community: Partial<Community>) => {
        try {
            const data = await updateMutation.mutateAsync({ id, community });
            return data;
        } catch {
            return undefined;
        }
    };
    const deleteCommunity = async (id: number) => {
        await deleteMutation.mutateAsync(id);
    };
    const followCommunity = async (id: number) => {
        try {
            const data = await followMutation.mutateAsync(id);
            return data;
        } catch {
            return undefined;
        }
    };
    const unfollowCommunity = async (id: number) => {
        try {
            const data = await unfollowMutation.mutateAsync(id);
            return data;
        } catch {
            return undefined;
        }
    };

    return (
        <CommunityContext.Provider value={{
            communities,
            currentCommunity,
            isLoading,
            error: error ? error.message : null,
            refetchCommunities: refetch,
            getCommunityById,
            getCommunitiesByCategory,
            searchCommunities,
            createCommunity,
            updateCommunity,
            deleteCommunity,
            followCommunity,
            unfollowCommunity
        }}>
            {children}
        </CommunityContext.Provider>
    );
};

export const useCommunity = () => {
    const context = useContext(CommunityContext);
    if (context === undefined) {
        throw new Error('useCommunity debe ser usado dentro de un CommunityProvider');
    }
    return context;
};