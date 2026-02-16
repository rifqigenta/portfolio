import * as THREE from "three";
import { RoundedBoxGeometry } from "three-stdlib";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Ref } from "vue";
import type { Skill } from "~/data/skills";

gsap.registerPlugin(ScrollTrigger);

export const useThreeScene = () => {
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let meshes: THREE.Mesh[] = [];
  let animationFrameId: number;

  const initScene = (canvas: Ref<HTMLCanvasElement | null>, cubeSection: Ref<HTMLElement | null>, skills: Skill[]) => {
    if (!canvas.value || !cubeSection.value) return;

    scene = new THREE.Scene();
    const { width, height } = cubeSection.value.getBoundingClientRect();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;

    renderer = new THREE.WebGLRenderer({
      canvas: canvas.value,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(2, 2, 5);
    scene.add(frontLight);

    const backLight = new THREE.PointLight(0xffffff, 0.5);
    backLight.position.set(-5, -5, -2);
    scene.add(backLight);

    createSkillMeshes(skills, cubeSection);
    setupHoverInteraction(canvas);
    animate();
  };

  const createSkillMeshes = (skills: Skill[], cubeSection: Ref<HTMLElement | null>) => {
    const loader = new THREE.TextureLoader();

    skills.forEach((skill, i) => {
      const texture = loader.load(skill.icon);
      const geometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.1);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: texture,
        roughness: 0.15,
        metalness: 0.05,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Initial chaos position
      mesh.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10);
      mesh.rotation.set(Math.random(), Math.random(), 0);
      mesh.userData = { name: skill.name };

      // Target grid position
      const columns = 5;
      const spacingX = 2.0;
      const spacingY = 1.8;
      const targetX = (i % columns) * spacingX - ((columns - 1) * spacingX) / 2;
      const targetY = -Math.floor(i / columns) * spacingY + 2;

      // Animate to grid on scroll
      gsap.to(mesh.position, {
        x: targetX,
        y: targetY,
        z: 0,
        scrollTrigger: {
          trigger: cubeSection.value,
          start: "top center",
          end: "top 10%",
          scrub: 2,
        },
      });

      gsap.to(mesh.rotation, {
        x: 0,
        y: 0,
        z: 0,
        scrollTrigger: {
          trigger: cubeSection.value,
          start: "top center",
          end: "top 10%",
          scrub: 2,
        },
      });

      scene.add(mesh);
      meshes.push(mesh);
    });
  };

  const setupHoverInteraction = (canvas: Ref<HTMLCanvasElement | null>) => {
    if (!canvas.value) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      if (!canvas.value) return;

      const rect = canvas.value.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes);

      const displayElement = document.getElementById("skill-name-display");
      if (!displayElement) return;

      if (intersects.length > 0) {
        const obj = intersects[0].object as THREE.Mesh;
        displayElement.innerText = obj.userData.name;
        document.body.style.cursor = "pointer";
        gsap.to(obj.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.3 });
      } else {
        displayElement.innerText = "";
        document.body.style.cursor = "default";
        meshes.forEach((m) => gsap.to(m.scale, { x: 1, y: 1, z: 1, duration: 0.3 }));
      }
    };

    window.addEventListener("mousemove", onMouseMove);
  };

  const animate = () => {
    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(animate);
  };

  const cleanup = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    meshes.forEach((mesh) => {
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => mat.dispose());
      } else {
        mesh.material.dispose();
      }
    });
    renderer.dispose();
  };

  return {
    initScene,
    cleanup,
  };
};
