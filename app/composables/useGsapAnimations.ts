import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import type { Ref } from "vue";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const useGsapAnimations = () => {
  let ctx: any;

  const initTypewriterEffect = () => {
    const roles = ["Software Developer", "Frontend Developer", "Fullstack Programmer"];
    const masterTl = gsap.timeline({ repeat: -1 });

    roles.forEach((role) => {
      const tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1.5 });
      tl.to(".typewriter", { duration: 1.5, text: role, ease: "none" });
      masterTl.add(tl);
    });
  };

  const initHeroAnimations = (heroText: Ref<HTMLElement | null>, heroImage: Ref<HTMLElement | null>) => {
    // Hero parallax
    gsap.to(".hero-content", {
      yPercent: -20,
      scrollTrigger: { trigger: ".hero-section", scrub: true },
    });

    // Profile container entrance
    gsap.from(".profile-container", {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });

    // Parallax for text and image
    if (heroText.value) {
      gsap.to(heroText.value, {
        y: -100,
        scrollTrigger: { trigger: "body", scrub: true },
      });
    }

    if (heroImage.value) {
      gsap.to(heroImage.value, {
        y: 50,
        scrollTrigger: { trigger: "body", scrub: true },
      });
    }
  };

  const initTimelineAnimations = (timelineSection: Ref<HTMLElement | null>, timelineLine: Ref<HTMLElement | null>, timelineItems: Ref<HTMLElement[]>) => {
    if (!timelineSection.value || !timelineLine.value) return;

    // Animate timeline line
    gsap.to(timelineLine.value, {
      scaleY: 1,
      scrollTrigger: {
        trigger: timelineSection.value,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Animate timeline cards
    timelineItems.value.forEach((item: HTMLElement, i: number) => {
      const card = item.querySelector(".timeline-card");
      if (card) {
        gsap.from(card, {
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        });
      }
    });
  };

  const initProjectsScroll = (aboutSection: Ref<HTMLElement | null>, aboutTrack: Ref<HTMLElement | null>) => {
    if (!aboutSection.value || !aboutTrack.value) return;

    const totalWidth = aboutTrack.value.scrollWidth;

    gsap.to(aboutTrack.value, {
      x: () => -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: aboutSection.value,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: true,
        pin: true,
      },
    });

    // Project title typewriter effect
    const projectTitles = document.querySelectorAll(".project-title-type");
    projectTitles.forEach((title) => {
      const originalText = title.textContent || "";
      title.textContent = "";

      gsap.to(title, {
        duration: 2,
        text: originalText,
        ease: "none",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  };

  const initAnimations = (refs: {
    heroText: Ref<HTMLElement | null>;
    heroImage: Ref<HTMLElement | null>;
    timelineSection: Ref<HTMLElement | null>;
    timelineLine: Ref<HTMLElement | null>;
    timelineItems: Ref<HTMLElement[]>;
    aboutSection: Ref<HTMLElement | null>;
    aboutTrack: Ref<HTMLElement | null>;
  }) => {
    ctx = gsap.context(() => {
      initTypewriterEffect();
      initHeroAnimations(refs.heroText, refs.heroImage);
      initTimelineAnimations(refs.timelineSection, refs.timelineLine, refs.timelineItems);
      initProjectsScroll(refs.aboutSection, refs.aboutTrack);
    });
  };

  const cleanup = () => {
    if (ctx) ctx.revert();
  };

  return {
    initAnimations,
    cleanup,
  };
};
