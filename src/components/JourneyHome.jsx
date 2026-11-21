import { useEffect, useRef } from "react";
import "./JourneyHome.css";

export default function JourneyHome() {
  const containerRef = useRef(null);
  useEffect(() => {
    const root = containerRef.current;
    const listeners = new AbortController();
    let frameId;
    const canvas = root.querySelector("canvas"),
      ctx = canvas.getContext("2d");
    if (!ctx) return;
    const play = root.querySelector('[data-action="play"]'),
      replay = root.querySelector('[data-action="replay"]');
    const seek = root.querySelector("input"),
      clock = root.querySelector(".journey-time");
    const heading = root.querySelector("strong"),
      subtitle = root.querySelector("small");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let playing = !reduced,
      time = 0,
      previous = 0,
      scene = -1,
      ratio = 1;
    const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
    const lerp = (a, b, p) => a + (b - a) * p;
    const smooth = (p) => {
      p = clamp(p);
      return p * p * (3 - 2 * p);
    };
    const colors = {
      sky: "#e5e9da",
      hill: "#c5d0b2",
      green: "#426b54",
      deep: "#163d32",
      cream: "#f4e6c8",
      roof: "#b96449",
      road: "#a2ad97",
      gold: "#e5ac55",
    };
    function rect(x, y, w, h, c) {
      ctx.fillStyle = c;
      ctx.fillRect(x, y, w, h);
    }
    function round(x, y, w, h, r, c) {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
    }
    function ellipse(x, y, rx, ry, c) {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    function poly(points, c) {
      ctx.fillStyle = c;
      ctx.beginPath();
      points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      ctx.fill();
    }
    function line(x1, y1, x2, y2, c, w = 2) {
      ctx.strokeStyle = c;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    function cloud(x, y, s = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      round(0, 0, 70, 13, 9, "#f9f8ec");
      ellipse(24, 0, 15, 12, "#f9f8ec");
      ellipse(43, -3, 17, 15, "#f9f8ec");
      ctx.restore();
    }
    function sky(t) {
      rect(0, 0, 534, 460, colors.sky);
      ellipse(94, 117, 46, 46, "#e8ae60");
      ctx.globalAlpha = 0.65;
      cloud(155 + Math.sin(t / 13) * 24, 90, 0.8);
      cloud(348 + Math.sin(t / 17) * 20, 162, 0.56);
      ctx.globalAlpha = 1;
    }
    function plane(x, y, angle) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ellipse(75, 39, 59, 4, "#70816b33");
      poly(
        [
          [61, 10],
          [35, -23],
          [51, -23],
          [98, 13],
        ],
        "#dddcd3",
      );
      poly(
        [
          [12, 7],
          [0, -29],
          [16, -29],
          [38, 10],
        ],
        "#bd2536",
      );
      poly(
        [
          [10, -23],
          [15, -23],
          [30, 0],
          [25, 0],
        ],
        "#d4ad68",
      );
      poly(
        [
          [4, -26],
          [8, -26],
          [23, -3],
          [19, -3],
        ],
        "#f3dba2",
      );
      round(0, 0, 152, 24, 12, "#fffaf0");
      poly(
        [
          [130, 0],
          [153, 13],
          [130, 13],
        ],
        "#fffaf0",
      );
      round(9, 17, 120, 6, 3, "#bd2536");
      rect(17, 15, 110, 2, "#d4ad68");
      poly(
        [
          [65, 14],
          [43, 46],
          [61, 46],
          [100, 16],
        ],
        "#dfded5",
      );
      poly(
        [
          [43, 46],
          [48, 39],
          [65, 39],
          [61, 46],
        ],
        "#bd2536",
      );
      round(130, 4, 11, 5, 2, "#4e7568");
      for (let i = 0; i < 8; i++) round(31 + i * 10, 6, 4, 4, 1, "#648577");
      ctx.fillStyle = "#a72436";
      ctx.font = "bold 7px Arial";
      ctx.fillText("AIR INDIA", 64, 14);
      line(40, 24, 40, 32, "#58705c", 3);
      line(115, 24, 115, 32, "#58705c", 3);
      ellipse(40, 33, 4, 4, colors.deep);
      ellipse(115, 33, 4, 4, colors.deep);
      ctx.restore();
    }
    function airport(t) {
      sky(t);
      ellipse(270, 320, 390, 115, "#cdd6bd");
      rect(0, 315, 534, 145, "#bdc8ad");
      rect(0, 281, 534, 37, "#99a68e");
      for (let x = 0; x < 550; x += 45) rect(x, 298, 24, 3, "#f3f0df");
      rect(44, 205, 278, 57, "#efead5");
      round(28, 194, 305, 16, 4, "#8b9e87");
      for (let i = 0; i < 12; i++) rect(55 + i * 21, 218, 15, 24, "#769586");
      rect(66, 168, 18, 27, "#a9b9a0");
      round(55, 153, 41, 17, 3, "#739280");
      rect(61, 158, 29, 7, "#b9d0bc");
      line(75, 153, 75, 143, "#69816b", 2);
      ctx.fillStyle = colors.deep;
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText("KERALA · ARRIVALS", 185, 255);
      ctx.textAlign = "left";
      let x, y, angle;
      if (t < 8) {
        let p = smooth(t / 8);
        x = lerp(-145, 250, p);
        y = lerp(93, 249, p);
        angle = lerp(0.14, 0, p);
      } else {
        let p = smooth((t - 8) / 6);
        x = lerp(250, 408, p);
        y = 249;
        angle = 0;
      }
      plane(x, y, angle);
      if (t > 8 && t < 9.1) {
        ctx.globalAlpha = Math.sin(((t - 8) / 1.1) * Math.PI) * 0.4;
        ellipse(x + 40, 285, 22, 5, "#fffdf5");
        ctx.globalAlpha = 1;
      }
    }
    function building(x, base, w, h, c) {
      rect(x, base - h, w, h, c);
      rect(x - 3, base - h - 5, w + 6, 5, "#839880");
      for (let row = 0; row < Math.floor(h / 25) - 1; row++)
        for (let col = 0; col < Math.floor(w / 18); col++)
          rect(x + 7 + col * 18, base - h + 12 + row * 24, 8, 11, "#698878");
      rect(x + w * 0.38, base - 24, w * 0.22, 24, "#527160");
    }
    function palm(x, y, s = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s, s);
      line(0, 0, 4, -74, "#6c815e", 5);
      const sway = Math.sin(time * 1.3 + x) * 4;
      for (const [dx, dy] of [
        [-39, -83],
        [-31, -100],
        [7, -113],
        [35, -98],
        [43, -76],
      ]) {
        ctx.strokeStyle = "#4c7957";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(4, -74);
        ctx.quadraticCurveTo(dx * 0.65 + sway, dy - 9, dx + sway, dy + 7);
        ctx.stroke();
      }
      ctx.restore();
    }
    function home(x, base, s = 1) {
      ctx.save();
      ctx.translate(x, base);
      ctx.scale(s, s);
      rect(-72, -111, 144, 111, colors.cream);
      rect(72, -111, 10, 111, "#b8c09f");
      poly(
        [
          [-87, -111],
          [0, -178],
          [87, -111],
        ],
        colors.roof,
      );
      rect(-52, -88, 27, 36, "#dfbe8a");
      rect(-48, -84, 19, 28, "#54796b");
      rect(26, -88, 27, 36, "#dfbe8a");
      rect(30, -84, 19, 28, "#54796b");
      round(-16, -40, 32, 45, 16, "#42684d");
      rect(-16, -16, 32, 16, "#42684d");
      round(-85, -5, 171, 8, 2, "#e1d2a9");
      ctx.restore();
    }
    function car(x, y, t, drive = true) {
      ctx.save();
      ctx.translate(x, y + (drive ? Math.sin(t * 13) * 0.6 : 0));
      ellipse(49, 39, 52, 5, "#5e715536");
      poly(
        [
          [19, 6],
          [30, -14],
          [68, -14],
          [87, 7],
        ],
        "#e8b051",
      );
      poly(
        [
          [27, 3],
          [35, -9],
          [48, -9],
          [48, 3],
        ],
        "#527969",
      );
      poly(
        [
          [53, -9],
          [66, -9],
          [78, 3],
          [53, 3],
        ],
        "#527969",
      );
      round(0, 4, 106, 29, 7, "#e8b051");
      rect(5, 25, 97, 5, "#cf983f");
      round(40, -22, 22, 8, 2, "#fff1c2");
      ctx.fillStyle = "#4c644f";
      ctx.font = "6px Arial";
      ctx.fillText("TAXI", 44, -16);
      rect(100, 11, 6, 7, "#fff0b8");
      rect(1, 12, 4, 7, "#bc664b");
      line(52, 7, 52, 24, "#d19b42", 1);
      line(57, 12, 64, 12, "#886f3a", 2);
      for (const wx of [22, 82]) {
        ellipse(wx, 32, 11, 11, "#304e3e");
        ellipse(wx, 32, 5, 5, "#a8b99f");
        if (drive) {
          let a = t * 6;
          line(
            wx - Math.cos(a) * 5,
            32 - Math.sin(a) * 5,
            wx + Math.cos(a) * 5,
            32 + Math.sin(a) * 5,
            "#6f8e76",
            2,
          );
        }
      }
      ctx.restore();
    }
    function journey(t) {
      let local = t - 14;
      let travel = smooth(clamp((local - 1) / 20));
      let camera = travel * 1080;
      sky(t);
      ellipse(200 - ((camera * 0.07) % 100), 310, 340, 120, "#d2dac3");
      ellipse(500 - camera * 0.045, 293, 235, 110, "#c5d0b2");
      rect(0, 298, 534, 162, "#bbc9a6");
      let village = clamp((camera - 550) / 480);
      ctx.globalAlpha = 1 - village * 0.65;
      for (let i = 0; i < 9; i++) {
        let x = i * 85 - camera * 0.75;
        building(
          x,
          300,
          55 + (i % 3) * 9,
          65 + (i % 4) * 30,
          ["#b6c4aa", "#a9bca1", "#c3ceb5"][i % 3],
        );
      }
      ctx.globalAlpha = 1;
      for (let i = 0; i < 7; i++) {
        let x = 650 + i * 150 - camera;
        palm(x, 304, 0.65 + (i % 2) * 0.15);
      }
      home(1455 - camera, 302, 0.78);
      home(1250 - camera, 306, 0.43);
      palm(1560 - camera, 307, 1);
      palm(1365 - camera, 305, 0.7);
      poly(
        [
          [1420 - camera, 310],
          [1480 - camera, 310],
          [1515 - camera, 342],
          [1370 - camera, 342],
        ],
        "#e3d0a7",
      );
      rect(0, 332, 534, 47, "#a1ad94");
      rect(0, 330, 534, 4, "#d8ddc9");
      let roadOffset = camera % 49;
      for (let i = -1; i < 13; i++)
        rect(i * 49 - roadOffset, 355, 25, 3, "#f1eddb");
      rect(0, 379, 534, 81, "#c8d1b7");
      let carX = local < 3 ? lerp(-120, 198, smooth(local / 3)) : 198;
      if (local > 21) carX = lerp(198, 270, smooth((local - 21) / 2));
      car(carX, 316, t, local < 23);
      if (local > 23) {
        const glow = 0.35 + 0.15 * Math.sin(t);
        ctx.globalAlpha = glow;
        ellipse(1455 - camera, 235, 30, 30, "#edc77a");
        ctx.globalAlpha = 1;
      }
    }
    function draw() {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, 534, 460);
      if (time < 14) airport(time);
      else if (time < 15.5) {
        const p = smooth((time - 14) / 1.5);
        airport(14);
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, 534 * p, 460);
        ctx.clip();
        journey(time);
        ctx.restore();
      } else journey(time);
      let phase = time < 14 ? 0 : time < 24 ? 1 : time < 34 ? 2 : 3;
      if (phase !== scene) {
        scene = phase;
        const copy = [
          ["Welcome back to Kerala.", "Your journey home starts here."],
          [
            "From arrivals to Kerala’s city streets.",
            "A familiar welcome. A comfortable ride.",
          ],
          [
            "Through Kerala’s coconut groves.",
            "A little closer to the people you love.",
          ],
          ["Home, in the heart of Kerala.", "Let’s help you look after it."],
        ][phase];
        heading.textContent = copy[0];
        subtitle.textContent = copy[1];
      }
      seek.value = time;
      clock.textContent = `0:${String(Math.floor(time)).padStart(2, "0")} / 0:40`;
      play.textContent = playing ? "Pause" : "Play";
      play.setAttribute("aria-pressed", String(!playing));
    }
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ratio = canvas.width / 534;
      draw();
    }
    function tick(now) {
      if (previous && playing)
        time = (time + Math.min((now - previous) / 1000, 0.1)) % 40;
      previous = now;
      draw();
      frameId = requestAnimationFrame(tick);
    }
    play.addEventListener(
      "click",
      () => {
        playing = !playing;
        draw();
      },
      { signal: listeners.signal },
    );
    replay.addEventListener(
      "click",
      () => {
        time = 0;
        playing = !reduced;
        scene = -1;
        draw();
      },
      { signal: listeners.signal },
    );
    seek.addEventListener(
      "input",
      () => {
        time = Number(seek.value);
        draw();
      },
      { signal: listeners.signal },
    );
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      listeners.abort();
    };
  }, []);

  return (
    <div
      id="nri-journey-preview"
      ref={containerRef}
      aria-label="Meet Mr NRI journey home animation"
    >
      <div className="journey-frame">
        <canvas
          role="img"
          aria-label="An Air India-inspired plane lands in Kerala. A taxi travels through the city and coconut groves to a village home."
        />
        <div className="journey-note">
          Closer to Kerala.
          <br />
          Closer to home.
        </div>
        <div className="journey-caption" aria-live="polite">
          <i aria-hidden="true">⌂</i>
          <div>
            <strong>Welcome back to Kerala.</strong>
            <small>Your journey home starts here.</small>
          </div>
        </div>
      </div>
      <div className="journey-controls" hidden>
        <button type="button" data-action="play">
          Pause
        </button>
        <button type="button" data-action="replay">
          Replay
        </button>
        <input
          type="range"
          min="0"
          max="40"
          step="0.1"
          defaultValue="0"
          aria-label="Preview position in seconds"
        />
        <span className="journey-time">0:00 / 0:40</span>
      </div>
    </div>
  );
}
