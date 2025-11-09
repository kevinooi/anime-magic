import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { TbArrowNarrowLeft } from "react-icons/tb";
import Footer from "@/components/Footer";
import classNames from "@/utils";
import { motion } from "framer-motion";
import { clearAnimeDetail, fetchAnimeDetail } from "@/store/animeSlice";
import Spinner from "@/components/ui/Spinner";
import FileNotFound from "@/assets/FileNotFound";

export default function AnimeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { anime, loading, error } = useAppSelector((state) => state.anime.detail);

  useEffect(() => {
    if (id) dispatch(fetchAnimeDetail(id));
    return () => {
      dispatch(clearAnimeDetail());
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={50} />
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="pt-8 min-h-screen flex flex-col">
        <button className="ml-4 flex items-center gap-x-2" onClick={() => navigate(-1)}>
          <TbArrowNarrowLeft />
          Back
        </button>
        <div className="flex-1 flex flex-col items-center justify-center">
          <FileNotFound />
          <h3 className="mt-4 text-lg font-semibold">{error ?? "Something went wrong!"}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white bg-linear-to-b from-[#0f1117] to-[#161921] min-h-screen">
      {/* Hero Section */}
      <AuroraBackground className="pt-8">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="w-full z-10"
        >
          <button className="ml-4 flex items-center gap-x-2" onClick={() => navigate(-1)}>
            <TbArrowNarrowLeft />
            Back
          </button>

          <section className="relative flex flex-col lg:flex-row items-center gap-8 p-8">
            <img src={anime.images.jpg.image_url} alt={anime.title} className="rounded-xl shadow-lg w-full max-w-sm" />

            <div className="flex-1 space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold">{anime.title_english || anime.title}</h1>
              <p className="text-lg text-gray-200 italic">{anime.title_japanese}</p>

              <div className="flex flex-wrap gap-4 mt-4 text-neutral font-semibold">
                <span className="bg-emerald-700 hover:bg-emerald-600 px-3 py-1 rounded-md text-sm">Score: {anime.score ?? "N/A"}</span>
                <span className="bg-sky-700 hover:bg-sky-600 px-3 py-1 rounded-md text-sm">Rank: #{anime.rank ?? "?"}</span>
                <span className="bg-rose-700 hover:bg-rose-600 px-3 py-1 rounded-md text-sm">Popularity: #{anime.popularity ?? "?"}</span>
              </div>

              {/* Tags */}
              <section className="flex flex-wrap gap-3">
                {[...anime.genres, ...anime.themes, ...anime.demographics].map((tag) => (
                  <span
                    key={tag.mal_id + tag.name}
                    className="bg-gray-500 hover:bg-gray-400 border-2 border-gray-500 hover:border-gray-100 px-3 py-1 rounded-full text-sm font-medium transition"
                  >
                    {tag.name}
                  </span>
                ))}
              </section>

              {(anime.trailer.url ?? anime.trailer.embed_url) && (
                <a
                  href={anime.trailer.url ?? anime.trailer.embed_url}
                  target="_blank"
                  className="inline-block bg-gray-100 hover:bg-white text-gray-700 font-semibold px-5 py-2 mt-4 rounded-lg transition-all cursor-pointer"
                >
                  🎬 Watch Trailer
                </a>
              )}
            </div>
          </section>
        </motion.div>
      </AuroraBackground>

      {/* Main Details */}
      <section className="grid lg:grid-cols-2 gap-10 px-8 py-12">
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b border-gray-500 pb-2">Anime Details</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              <strong>Type:</strong> {anime.type}
            </li>
            <li>
              <strong>Episodes:</strong> {anime.episodes}
            </li>
            <li>
              <strong>Status:</strong> {anime.status}
            </li>
            <li>
              <strong>Duration:</strong> {anime.duration}
            </li>
            <li>
              <strong>Rating:</strong> {anime.rating}
            </li>
            <li>
              <strong>Source:</strong> {anime.source}
            </li>
            <li>
              <strong>Season:</strong> {anime.season} {anime.year}
            </li>
            {anime.broadcast?.day && (
              <li>
                <strong>Broadcast:</strong> {anime.broadcast.day}, {anime.broadcast.time} ({anime.broadcast.timezone})
              </li>
            )}
          </ul>
          <div className="pt-4 space-y-2">
            {(anime.studios?.length ?? 0) > 0 && (
              <>
                <h3 className="font-bold text-xl">Studios</h3>
                <div className="flex flex-wrap gap-2">
                  {anime.studios.map((studio) => (
                    <a
                      key={studio.mal_id}
                      href={studio.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-500"
                    >
                      {studio.name}
                    </a>
                  ))}
                </div>
              </>
            )}
            {(anime.producers?.length ?? 0) > 0 && (
              <>
                <h3 className="font-bold text-xl mt-4">Producers</h3>
                <div className="flex flex-wrap gap-2">
                  {anime.producers.map((prod) => (
                    <a
                      key={prod.mal_id}
                      href={prod.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-500"
                    >
                      {prod.name}
                    </a>
                  ))}
                </div>
              </>
            )}
            {(anime.licensors?.length ?? 0) > 0 && (
              <>
                <h3 className="font-bold text-xl mt-4">Licensors</h3>
                <div className="flex flex-wrap gap-2">
                  {anime.licensors.map((lic) => (
                    <a
                      key={lic.mal_id}
                      href={lic.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-500"
                    >
                      {lic.name}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {/* Right Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b border-gray-500 pb-2">Synopsis</h2>
          <p className="text-gray-300 leading-relaxed">{anime.synopsis || "No synopsis available."}</p>
          {anime.background && (
            <>
              <h2 className="text-2xl font-bold border-b border-gray-500 pb-2">Background</h2>
              <p className="text-gray-300 leading-relaxed">{anime.background}</p>
            </>
          )}
        </div>
      </section>

      <Footer className="px-4" />
    </div>
  );
}

type AuroraBackgroundProps = {
  className?: string;
  showRadialGradient?: boolean;
  auroraClassName?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const AuroraBackground = ({ className, children, showRadialGradient = true, auroraClassName, ...props }: AuroraBackgroundProps) => {
  return (
    <div className={classNames("relative flex flex-col items-center justify-center bg-zinc-900 transition-bg", className)} {...props}>
      <div className={classNames("absolute inset-0 overflow-hidden", auroraClassName)}>
        <div
          className={classNames(
            `[--white-gradient:repeating-linear-gradient(100deg,var(--color-white)_0%,var(--color-white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--color-white)_16%)] 
            [--dark-gradient:repeating-linear-gradient(100deg,var(--color-black)_0%,var(--color-black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--color-black)_16%)] 
            [--aurora:repeating-linear-gradient(100deg,var(--color-purple-300)_10%,var(--color-fuchsia-200)_15%,var(--color-pink-200)_20%,var(--color-rose-300)_25%,var(--color-violet-200)_30%)] 
            [--transparent:rgba(255,255,255,0)] [background-image:var(--white-gradient),var(--aurora)] 
            dark:[background-image:var(--dark-gradient),var(--aurora)] 
            bg-size-[300%,200%] bg-position-[50%_50%,50%_50%] 
            filter blur-[10px] invert dark:invert-0 
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)] after:bg-size-[200%,100%] animate-aurora after:bg-fixed after:mix-blend-difference 
            pointer-events-none absolute -inset-2.5 opacity-50 will-change-transform`,
            showRadialGradient && `mask-[radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};
