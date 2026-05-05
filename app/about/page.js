
export default function AboutPage() {
  return (
    <div className="pt-40 pb-stack-lg max-w-container-max mx-auto px-8 md:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Story Content */}
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-tertiary font-bold">
              Our Legacy
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-primary dark:text-neutral leading-[1.1]">
              Crafting Surfaces <br /> 
              With <span className="text-tertiary font-light italic">Soul</span>
            </h1>
          </div>
          
          <div className="space-y-6 text-lg text-secondary leading-relaxed font-inter font-medium">
            <p>
              Founded in Milan in 1984, Ceramica began with a simple vision: 
              to bridge the gap between industrial precision and artisanal beauty.
            </p>
            <p>
              We believe that every architectural project is a conversation 
              between space and material. Our mission is to provide the 
              vocabulary for that conversation through the world's most 
              refined porcelain and natural stone surfaces.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 pt-8 border-t border-border">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-primary dark:text-neutral">40+</h3>
              <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Years of Experience</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-primary dark:text-neutral">1200+</h3>
              <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Global Projects</p>
            </div>
          </div>
        </div>

        {/* Brand Image / Philosophy Box */}
        <div className="relative aspect-[4/5] bg-stone-100 dark:bg-stone-900 overflow-hidden border border-border">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="space-y-8 text-center">
              <div className="w-16 h-1 bg-tertiary mx-auto"></div>
              <h2 className="text-3xl font-light text-primary dark:text-neutral uppercase tracking-[0.2em]">
                Precision <br />
                Artistry <br />
                Sustainability
              </h2>
              <p className="text-secondary text-xs uppercase tracking-widest max-w-xs mx-auto leading-loose">
                Every surface in our catalog is rigorously tested for architectural standards 
                while maintaining the organic variation that makes natural materials unique.
              </p>
            </div>
          </div>
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#000_1px,_transparent_1px)] [background-size:20px_20px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
