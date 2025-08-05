// import React, { useState, useEffect, FormEvent } from 'react';
// import axios from 'axios';

// interface Comment {
//   id: number;
//   text: string;
// }

// const API = 'http://localhost:5000/api/comments/';

// const CommentManager = () => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const taskId = 1;
//   const [text, setText] = useState('');
//   const [editId, setEditId] = useState<number | null>(null);

//   // const fetchComments = async () => {
//   //   try {
//   //     const res = await axios.post(API, {
//   //       task_id: taskId,
//   //       text: text,
//   //     }, {
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       }
//   //     });
//   //     console.log("Fetched data from GET:", res.data);

//   //     if (Array.isArray(res.data)) {
//   //       setComments(res.data);
//   //     } else {
//   //       console.error('Unexpected response format:', res.data);
//   //       setComments([]);
//   //     }
//   //   } catch (err) {
//   //     console.error('Failed to fetch comments', err);
//   //     setComments([]);
//   //   }
//   // };
// const fetchComments = async () => {
//   try {
//     const res = await axios.get(`${API}?task_id=${taskId}`);
//     console.log("Fetched data from GET:", res.data);

//     if (Array.isArray(res.data)) {
//       setComments(res.data);
//     } else {
//       console.error('Unexpected response format:', res.data);
//       setComments([]);
//     }
//   } catch (err) {
//     console.error('Failed to fetch comments', err);
//     setComments([]);
//   }
// };


//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     console.log('Sending to backend:', { task_id: taskId, text });

//     try {
//       if (editId) {
//         await axios.put(`${API}${editId}`, { text });
//       } else {
//         await axios.post(API, { task_id: taskId, text });
//       }
//       setText('');
//       setEditId(null);
//       fetchComments();
//     } catch (err) {
//       console.error('Failed to save comment', err);
//     }
//   };

//   const handleEdit = (comment: Comment) => {
//     setText(comment.text);
//     setEditId(comment.id);
//   };

//  const handleDelete = async (id: number) => {
//   try {
//     await axios.delete(`${API}${id}`);
//     fetchComments();
//   } catch (err) {
//     console.error('Failed to delete comment', err);
//   }
// };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Comment Manager</h2>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="border p-2 mr-2"
//           placeholder="Write comment"
//           required
//         />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
//           {editId ? 'Update' : 'Add'}
//         </button>
//       </form>
//       <ul>
//         {comments.map((c) => (
//           <li key={c.id} className="mb-2">
//             {c.text}
//             <button onClick={() => handleEdit(c)} className="ml-2 text-yellow-600">Edit</button>
//             <button onClick={() => handleDelete(c.id)} className="ml-2 text-red-600">Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CommentManager;



import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

interface Comment {
  id: number;
  text: string;
}

const API = 'http://localhost:5000/api/comments/';

const CommentManager = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const taskId = 1;
  const [text, setText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animatingIds, setAnimatingIds] = useState<Set<number>>(new Set());

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API}?task_id=${taskId}`);
      console.log("Fetched data from GET:", res.data);
     
      if (Array.isArray(res.data)) {
        setComments(res.data);
      } else {
        console.error('Unexpected response format:', res.data);
        setComments([]);
      }
    } catch (err) {
      console.error('Failed to fetch comments', err);
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    console.log('Sending to backend:', { task_id: taskId, text });

    try {
      if (editId) {
        await axios.put(`${API}${editId}`, { text });
      } else {
        const response = await axios.post(API, { task_id: taskId, text });
        // Animate new comment if we get the ID back
        if (response.data && response.data.id) {
          setAnimatingIds(prev => new Set([...prev, response.data.id]));
          setTimeout(() => {
            setAnimatingIds(prev => {
              const newSet = new Set(prev);
              newSet.delete(response.data.id);
              return newSet;
            });
          }, 500);
        }
      }
      setText('');
      setEditId(null);
      fetchComments();
    } catch (err) {
      console.error('Failed to save comment', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (comment: Comment) => {
    setText(comment.text);
    setEditId(comment.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}${id}`);
      fetchComments();
    } catch (err) {
      console.error('Failed to delete comment', err);
    }
  };

  const handleCancel = () => {
    setText('');
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full absolute -top-1 -right-1 animate-pulse"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Comment Manager
            </h1>
          </div>
          <p className="text-gray-600">Share your thoughts and collaborate seamlessly</p>
        </div>

        {/* Comment Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-8 hover:shadow-2xl transition-all duration-300">
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-4 pr-12 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 resize-none placeholder-gray-400 bg-white/50"
                placeholder={editId ? "Update your comment..." : "Share your thoughts..."}
                rows={3}
                required
              />
              <div className="absolute bottom-3 right-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {text.length}/280
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {editId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !text.trim()}
                className="group relative px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center gap-2">
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : editId ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                  {editId ? 'Update Comment' : 'Add Comment'}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No comments yet</p>
              <p className="text-gray-400">Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment, index) => (
              <div
                key={comment.id}
                className={`group bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300 ${
                  animatingIds.has(comment.id) ? 'animate-pulse scale-105' : ''
                } ${editId === comment.id ? 'ring-2 ring-indigo-300 bg-indigo-50/50' : ''}`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {comment.id}
                      </div>
                      <div className="text-xs text-gray-500">
                        Comment #{comment.id}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleEdit(comment)}
                      className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors duration-200"
                      title="Edit comment"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete comment"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats Footer */}
        {comments.length > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/50">
              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm text-gray-600">
                {comments.length} comment{comments.length !== 1 ? 's' : ''} total
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentManager;