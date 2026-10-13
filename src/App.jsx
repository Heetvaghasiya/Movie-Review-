import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [recommend, setRecommend] = useState("Yes");

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("movieReviews");

    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("movieReviews", JSON.stringify(reviews));
  }, [reviews]);

  const validateForm = () => {
    const newErrors = {};

    if (!movieTitle.trim()) {
      newErrors.movieTitle = "Movie title is required";
    }

    if (!review.trim()) {
      newErrors.review = "Review is required";
    } else if (review.trim().length < 10) {
      newErrors.review = "Review must be at least 10 characters";
    }

    if (!rating) {
      newErrors.rating = "Please select a rating";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newReview = {
      id: Date.now(),
      movieTitle,
      review,
      rating,
      recommend,
    };

    setReviews([newReview, ...reviews]);

    setMovieTitle("");
    setReview("");
    setRating("");
    setRecommend("Yes");
    setErrors({});
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((item) => item.id !== id));
  };

  return (

    <>
      <div className="min-h-screen bg-slate-950 text-white">

        <nav className="border-b border-slate-800 bg-slate-900">
          <div className="mx-auto flex max-w-6xl items-center justify-between ">
            <h1 className="text-2xl font-bold">
              🎬 <span className="text-purple-400">Movie</span> Review
            </h1>

            <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              Share Your Opinion
            </span>
          </div>
        </nav>


        {/* <section className="mx-auto max-w-6xl px-16 py-12 text-center">
          <h2 className="text-4xl font-extrabold md:text-5xl">
            Review Your Favorite Movies
          </h2>
        </section> */}

        <main className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 lg:grid-cols-2 p-6">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <h3 className="mb-6 text-2xl font-bold">
              Write a Review
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Movie Title
                </label>

                <input
                  type="text"
                  placeholder="Enter movie title"
                  value={movieTitle}
                  onChange={(e) => setMovieTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-purple-500"
                />

                {errors.movieTitle && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.movieTitle}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Rating
                </label>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-3xl transition ${star <= rating
                        ? "text-yellow-400"
                        : "text-slate-600"
                        } hover:scale-110`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                {rating && (
                  <p className="mt-1 text-sm text-yellow-400">
                    {rating}/5 Stars
                  </p>
                )}

                {errors.rating && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.rating}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Your Review
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your movie review..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-purple-500"
                />

                {errors.review && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.review}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium">
                  Would you recommend this movie?
                </label>

                <label className="flex cursor-pointer items-center gap-3">

                  <input
                    type="checkbox"
                    checked={recommend === "Yes"}
                    onChange={(e) =>
                      setRecommend(e.target.checked ? "Yes" : "No")
                    }
                    className="h-5 w-5 cursor-pointer accent-green-500"
                  />

                  <span
                    className={
                      recommend === "Yes"
                        ? "font-medium text-green-400"
                        : "font-medium text-red-400"
                    }
                  >
                    {recommend === "Yes"
                      ? "Recommended"
                      : "Not Recommended"}
                  </span>

                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-purple-600 py-3 font-semibold transition hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20"
              >
                Submit Review
              </button>

            </form>
          </div>

          <div>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-bold">
                🎥 Movie Reviews
              </h3>

              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
                {reviews.length} Reviews
              </span>
            </div>

            {reviews.length === 0 ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900">
                <div className="text-center">
                  <div className="mb-4 text-6xl">🎬</div>

                  <h4 className="text-xl font-semibold">
                    No Reviews Yet
                  </h4>

                  <p className="mt-2 text-slate-400">
                    Be the first person to review a movie!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">

                {reviews.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <h4 className="text-xl font-bold">
                          🎬 {item.movieTitle}
                        </h4>

                        <div className="mt-2 flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={
                                star <= item.rating
                                  ? "text-yellow-400"
                                  : "text-slate-700"
                              }
                            >
                              ★
                            </span>
                          ))}

                          <span className="ml-2 text-sm text-slate-400">
                            {item.rating}/5
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteReview(item.id)}
                        className="rounded-lg px-3 py-2 text-red-400 transition hover:bg-red-500/10"
                      >
                        🗑️
                      </button>

                    </div>

                    <p className="mt-4 leading-7 text-slate-300">
                      {item.review}
                    </p>

                    <div className="mt-5 border-t border-slate-800 pt-4">
                      {item.recommend === "Yes" ? (
                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                          👍 Recommended
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm text-red-400">
                          👎 Not Recommended
                        </span>
                      )}
                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>

        </main>
      </div>
    </>
  )
}

export default App
