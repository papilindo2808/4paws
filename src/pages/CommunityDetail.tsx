import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCommunity } from '../context/CommunityContext';
import { usePost } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  const { 
    currentCommunity: community, 
    error: communityError,
    getCommunityById,
    followCommunity,
    unfollowCommunity
  } = useCommunity();

  const {
    posts,
    error: postsError,
    getPostsByCommunityOrderByDate,
    getPostsByCommunityOrderByLikes,
    likePost,
    unlikePost
  } = usePost();

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const loadData = useCallback(async () => {
    if (!id || !isMounted) return;
    
    try {
      if (retryCount >= maxRetries) {
        console.error('Máximo número de reintentos alcanzado');
        return;
      }

      await delay(1000 * (retryCount + 1)); // Espera incremental
      await getCommunityById(Number(id));
      
      if (sortBy === 'recent') {
        await getPostsByCommunityOrderByDate(Number(id));
      } else {
        await getPostsByCommunityOrderByLikes(Number(id));
      }
      
      setRetryCount(0); // Resetear contador si todo sale bien
    } catch (error) {
      console.error('Error loading community data:', error);
      setRetryCount(prev => prev + 1);
      if (retryCount < maxRetries) {
        await delay(1000 * (retryCount + 1));
        loadData();
      }
    }
  }, [id, sortBy, isMounted, retryCount, getCommunityById, getPostsByCommunityOrderByDate, getPostsByCommunityOrderByLikes]);

  useEffect(() => {
    setIsMounted(true);
    loadData();
    
    return () => {
      setIsMounted(false);
    };
  }, [loadData]);

  const handleFollow = async () => {
    if (!community) return;
    try {
      if (community.followers?.some(f => f.id === user?.id)) {
        await unfollowCommunity(community.id);
      } else {
        await followCommunity(community.id);
      }
    } catch (error) {
      console.error('Error al seguir/dejar de seguir la comunidad:', error);
    }
  };

  const handleLike = async (postId: number) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (post?.likedBy?.some(l => l.id === user?.id)) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
    } catch (error) {
      console.error('Error al dar like al post:', error);
    }
  };

  if (communityError || postsError) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {communityError || postsError}</p>
        </div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p>Comunidad no encontrada</p>
        </div>
      </div>
    );
  }

  const isFollowing = community.followers?.some(f => f.id === user?.id);

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado de la comunidad */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={community.imageUrl || '/default_profile_dog.jpg'}
                alt={community.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{community.name}</h1>
                <p className="text-gray-600">{community.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  {community.members} miembros
                </div>
              </div>
            </div>
            <button
              onClick={handleFollow}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                isFollowing
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  : 'bg-[#f59e0b] text-white hover:bg-[#e89209]'
              }`}
            >
              {isFollowing ? 'Siguiendo' : 'Seguir'}
            </button>
          </div>
        </div>

        {/* Controles de ordenamiento y botón de crear post */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setSortBy('recent')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                sortBy === 'recent'
                  ? 'bg-[#f59e0b] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Más recientes
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                sortBy === 'popular'
                  ? 'bg-[#f59e0b] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Más populares
            </button>
          </div>
          <button 
            onClick={() => navigate(`/community/${id}/create-post`)}
            className="px-6 py-2 bg-[#f59e0b] text-white rounded-full hover:bg-[#e89209] transition-colors duration-200"
          >
            Crear Publicación
          </button>
        </div>

        {/* Lista de posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <img
                    src={post.author.imageUrl || '/default_profile_dog.jpg'}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-600">
                    Publicado por {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.content}
                </p>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex items-center space-x-6 text-gray-500">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-1 ${
                      post.likedBy?.some(l => l.id === user?.id)
                        ? 'text-[#f59e0b]'
                        : 'hover:text-[#f59e0b]'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-[#f59e0b]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{post.comments?.length || 0} comentarios</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-[#f59e0b]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>Compartir</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;