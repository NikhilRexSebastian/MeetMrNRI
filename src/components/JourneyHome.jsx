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
    function person(x, y, t, shirt = "#b96449", scale = 1) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ellipse(0, -48, 9, 10, "#bd946f");
      round(-10, -36, 20, 28, 5, shirt);
      line(-5, -9, -8, 13, "#49674f", 6);
      line(5, -9, 8, 13, "#49674f", 6);
      line(-8, -30, -18, -13, "#bd946f", 5);
      line(8, -30, 18, -18 + Math.sin(t * 2) * 3, "#bd946f", 5);
      ctx.restore();
    }
    function maintenance(t) {
      sky(t);
      ellipse(250, 328, 320, 130, "#c5d0b2");
      rect(0, 310, 534, 150, "#c4cfaf");
      palm(77, 310, 0.95);
      palm(457, 315, 1.15);
      home(275, 310, 1.04);
      poly(
        [
          [250, 310],
          [298, 310],
          [340, 385],
          [202, 385],
        ],
        "#e5d2a9",
      );
      // A ladder and a worker painting the outside wall.
      line(346, 312, 323, 213, "#96774f", 5);
      line(368, 312, 345, 213, "#96774f", 5);
      for (let i = 0; i < 7; i++) {
        let y = 223 + i * 13;
        line(
          326 + (y - 223) * 0.23,
          y,
          348 + (y - 223) * 0.23,
          y,
          "#b29361",
          3,
        );
      }
      person(343, 257, t, "#547b6a", 0.75);
      const rollerY = 220 + Math.sin(t * 1.9) * 13;
      line(333, 235, 314, rollerY, "#a48059", 3);
      round(298, rollerY - 5, 20, 10, 2, "#f8efd8");
      rect(291, 208, 14, 49, "#f8efd8");
      round(376, 305, 22, 24, 3, "#cda45f");
      round(373, 302, 28, 5, 2, "#e2c390");
      // Gardener tending the plants beside the house.
      person(168, 321, t, "#bd714e", 0.8);
      for (let i = 0; i < 5; i++) {
        let x = 112 + i * 15;
        line(x, 330, x + Math.sin(t + i) * 2, 307 - (i % 2) * 8, "#4e7950", 3);
        ellipse(x - 4, 315, 6, 3, "#628c56");
        ellipse(x + 4, 310, 6, 3, "#6b945e");
      }
      round(147, 303, 14, 10, 3, "#d2ae69");
    }
    function hospital(t) {
      sky(t);
      ellipse(280, 329, 360, 128, "#c5d0b2");
      rect(0, 317, 534, 143, "#c7d2b6");
      rect(116, 179, 294, 142, "#f3eddb");
      round(105, 165, 316, 20, 4, "#729383");
      rect(236, 228, 58, 93, "#c4d4bf");
      rect(240, 233, 23, 80, "#769c8a");
      rect(268, 233, 22, 80, "#769c8a");
      for (const x of [133, 172, 323, 362]) round(x, 222, 25, 35, 2, "#82a28f");
      round(226, 184, 80, 29, 3, "#fff9e9");
      ctx.fillStyle = "#416f58";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText("HOSPITAL", 266, 204);
      ctx.textAlign = "left";
      rect(257, 138, 18, 43, "#54856c");
      rect(245, 150, 42, 18, "#54856c");
      poly(
        [
          [237, 321],
          [293, 321],
          [339, 378],
          [191, 378],
        ],
        "#e5d5b5",
      );
      palm(73, 325, 0.8);
      palm(453, 328, 0.85);
      let walking = smooth(clamp((t - 46) / 5));
      person(lerp(129, 204, walking), 332, t, "#bc7855", 0.83);
      person(lerp(155, 229, walking), 334, t, "#d4b67c", 0.7);
      person(302, 331, t, "#fff9e9", 0.85);
      rect(310, 297, 18, 23, "#a3b797");
      rect(313, 301, 12, 15, "#f7f3e5");
      // Appointment calendar, drawn beside the entrance.
      round(348, 274, 51, 46, 4, "#fff9e9");
      round(348, 274, 51, 12, 3, "#b96a51");
      for (let row = 0; row < 2; row++)
        for (let col = 0; col < 3; col++)
          rect(356 + col * 12, 293 + row * 10, 5, 4, "#a6b49c");
      line(373, 300, 377, 304, "#426c51", 2);
      line(377, 304, 385, 293, "#426c51", 2);
    }
    function beach(t) {
      sky(t);
      rect(0, 211, 534, 117, "#8eb9ac");
      rect(0, 266, 534, 80, "#afd0ba");
      poly(
        [
          [0, 304],
          [110, 314],
          [236, 302],
          [370, 315],
          [534, 298],
          [534, 460],
          [0, 460],
        ],
        "#ecd8ad",
      );
      for (let row = 0; row < 4; row++) {
        ctx.beginPath();
        ctx.strokeStyle = row % 2 ? "#d9e8d0" : "#c7dfc8";
        ctx.lineWidth = 3;
        for (let x = 0; x <= 534; x += 8) {
          let y = 229 + row * 23 + Math.sin(x / 38 - t * 0.8 + row) * 4;
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.stroke();
      }
      palm(69, 340, 1.35);
      palm(464, 345, 1.1);
      const bx = 190 + Math.sin(t * 0.25) * 24;
      poly(
        [
          [bx, 254],
          [bx + 75, 254],
          [bx + 62, 266],
          [bx + 13, 266],
        ],
        "#8d6b48",
      );
      round(bx + 16, 237, 44, 19, 9, "#c8b27d");
      for (let i = 0; i < 4; i++) rect(bx + 23 + i * 8, 244, 5, 8, "#648477");
      line(354, 294, 354, 355, "#9a8056", 4);
      poly(
        [
          [304, 296],
          [354, 253],
          [404, 296],
        ],
        "#c06d50",
      );
      poly(
        [
          [354, 253],
          [354, 296],
          [379, 296],
        ],
        "#e6b864",
      );
      line(304, 348, 342, 348, "#94794e", 5);
      line(307, 350, 302, 362, "#94794e", 3);
      line(338, 350, 342, 361, "#94794e", 3);
      person(245, 352, t, "#537f70", 0.72);
      person(273, 350, t, "#be7b54", 0.66);
    }
    function houseboat(t) {
      sky(t);
      ellipse(250, 240, 360, 58, "#c0ceb0");
      for (let i = 0; i < 7; i++) palm(i * 89 + 12, 245, 0.52 + (i % 2) * 0.12);
      rect(0, 250, 534, 210, "#9cbfaf");
      for (let r = 0; r < 5; r++) {
        ctx.beginPath();
        ctx.strokeStyle = r % 2 ? "#bbd2bb" : "#c8dcc5";
        ctx.lineWidth = 2;
        for (let x = 0; x <= 534; x += 10) {
          let y = 280 + r * 26 + Math.sin(x / 36 + t * 0.8 + r) * 3;
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.stroke();
      }
      const bx = 125 + Math.sin(((t - 62) / 8) * Math.PI) * 27,
        by = 300 + Math.sin(t) * 2;
      ctx.save();
      ctx.translate(bx, by);
      ellipse(120, 22, 137, 8, "#739b8790");
      poly(
        [
          [-17, 0],
          [256, 0],
          [233, 23],
          [11, 23],
        ],
        "#816647",
      );
      round(12, -62, 211, 65, 24, "#c5ad77");
      round(24, -54, 185, 52, 17, "#d3be89");
      for (let i = 0; i < 19; i++)
        line(30 + i * 9, -48, 30 + i * 9, -3, "#b89c64", 1);
      for (let i = 0; i < 4; i++) {
        round(43 + i * 37, -35, 26, 25, 3, "#5e8370");
        rect(54 + i * 37, -35, 3, 25, "#cbb47d");
      }
      rect(178, -34, 20, 37, "#98794f");
      line(-1, -1, 235, -1, "#e2cf9c", 4);
      line(231, -19, 249, 13, "#8a7049", 3);
      ctx.restore();
    }
    function courier(t) {
      sky(t);
      ellipse(265, 322, 360, 125, "#c5d0b2");
      rect(0, 311, 534, 149, "#c7d1b4");
      home(377, 303, 0.78);
      palm(470, 313, 0.85);
      palm(76, 315, 0.8);
      rect(0, 332, 534, 44, "#a1ad94");
      for (let i = 0; i < 12; i++) rect(i * 49, 352, 25, 3, "#f1eddb");
      let p = smooth(clamp((t - 70) / 3));
      const vx = lerp(-145, 119, p);
      ctx.save();
      ctx.translate(vx, 303);
      round(0, -49, 92, 69, 6, "#ead6ac");
      round(90, -27, 48, 47, 7, "#bc704e");
      poly(
        [
          [96, -22],
          [117, -22],
          [129, -4],
          [96, -4],
        ],
        "#608571",
      );
      for (const x of [25, 111]) {
        ellipse(x, 21, 12, 12, "#365541");
        ellipse(x, 21, 5, 5, "#b8c5ab");
      }
      ctx.fillStyle = "#426b54";
      ctx.font = "12px Arial";
      ctx.fillText("COURIER", 13, -15);
      rect(136, 2, 4, 8, "#f8e6b4");
      ctx.restore();
      if (t > 73) {
        const progress = smooth((t - 73) / 3.5);
        const px = lerp(255, 320, progress);
        person(px, 322, t, "#bc704e", 0.85);
        round(px + 10, 289, 22, 21, 2, "#d9b779");
        rect(px + 19, 289, 4, 21, "#ebd2a1");
        line(px + 14, 300, px + 28, 300, "#a78a59", 1);
      }
      person(355, 321, t, "#618772", 0.8);
    }
    function paddy(t) {
      sky(t);
      ellipse(155, 270, 264, 106, "#b9ca9e");
      ellipse(422, 282, 225, 127, "#cad6b4");
      rect(0, 282, 534, 178, "#b9cb8c");
      const rows = [
        [
          [0, 292],
          [173, 278],
          [534, 294],
          [534, 318],
          [185, 301],
          [0, 314],
        ],
        [
          [0, 328],
          [180, 315],
          [534, 334],
          [534, 359],
          [180, 338],
          [0, 351],
        ],
        [
          [0, 367],
          [185, 350],
          [534, 376],
          [534, 403],
          [185, 375],
          [0, 392],
        ],
      ];
      rows.forEach((points, i) => {
        poly(points, i % 2 ? "#9ab978" : "#a8c183");
        ctx.beginPath();
        ctx.strokeStyle = "#e5dfad";
        ctx.lineWidth = 5;
        points
          .slice(0, 3)
          .forEach(([x, y], j) => (j ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.stroke();
      });
      for (let r = 0; r < 3; r++)
        for (let i = 0; i < 21; i++) {
          let x = i * 27 + (r % 2) * 8,
            y = 305 + r * 38;
          let sway = Math.sin(t * 1.5 + i * 0.4) * 3;
          line(x, y, x + sway, y - 10, "#70944f", 2);
          line(x, y - 2, x - 4 + sway, y - 7, "#809e52", 1);
        }
      home(399, 281, 0.46);
      palm(453, 291, 0.9);
      palm(334, 284, 0.65);
      palm(78, 281, 0.76);
      person(214, 331, t, "#bf8456", 0.6);
      ellipse(214, 300, 12, 4, "#d4b47d");
      round(232, 322, 17, 13, 4, "#b69a62");
    }
    function renderScene(t) {
      if (t < 14) airport(t);
      else if (t < 38) journey(t);
      else if (t < 46) maintenance(t);
      else if (t < 54) hospital(t);
      else if (t < 62) beach(t);
      else if (t < 70) houseboat(t);
      else if (t < 78) courier(t);
      else paddy(t);
    }
    function draw() {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, 534, 460);
      renderScene(time);
      // A gentle cream dissolve marks each new chapter.
      const boundaries = [14, 38, 46, 54, 62, 70, 78];
      for (const b of boundaries) {
        const d = Math.abs(time - b);
        if (d < 0.55) {
          ctx.globalAlpha = (1 - d / 0.55) * 0.8;
          rect(0, 0, 534, 460, "#f8f6ee");
          ctx.globalAlpha = 1;
        }
      }
      let phase =
        time < 14
          ? 0
          : time < 24
            ? 1
            : time < 34
              ? 2
              : time < 38
                ? 3
                : time < 46
                  ? 4
                  : time < 54
                    ? 5
                    : time < 62
                      ? 6
                      : time < 70
                        ? 7
                        : time < 78
                          ? 8
                          : 9;
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
          [
            "Your home, looked after.",
            "Help coordinating maintenance and upkeep.",
          ],
          [
            "A little help for your loved ones.",
            "Hospital appointments and local coordination.",
          ],
          [
            "Enjoy your holidays in India.",
            "Beach days, new places and time together.",
          ],
          [
            "Slow down on a houseboat holiday.",
            "Discover Kerala’s beautiful backwaters.",
          ],
          [
            "International courier assistance.",
            "Help coordinating collection and delivery overseas.",
          ],
          [
            "Back to your roots.",
            "Paddy fields, coconut palms and a place called home.",
          ],
        ][phase];
        heading.textContent = copy[0];
        subtitle.textContent = copy[1];
      }
      seek.value = time;
      const seconds = Math.floor(time);
      clock.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")} / 1:26`;
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
        time = (time + Math.min((now - previous) / 1000, 0.1)) % 86;
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
      <div className="journey-controls">
        <button type="button" data-action="play">
          Pause
        </button>
        <button type="button" data-action="replay">
          Replay
        </button>
        <input
          type="range"
          min="0"
          max="86"
          step="0.1"
          defaultValue="0"
          aria-label="Preview position in seconds"
        />
        <span className="journey-time">0:00 / 1:26</span>
      </div>
    </div>
  );
}
