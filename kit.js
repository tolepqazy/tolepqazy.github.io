/* Общий набор для всех концепций: иконки, метки ЖК, статистика, ИИ-подбор (алгоритмы), страница квартиры, окна.
   Данные — window.BQ (data.js, выгрузка baqytgroup.kz) и window.BQX (common.js). */
(function () {
  const { ZK, monthly, fmt, mln, area, roomsWord, plural, R } = window.BQX;
  const FL = window.BQ.flats, EX = window.BQ.extra, SLOTS = window.BQ.slots;
  const ORDER = ['life', 'plaza', 'eco'];
  const SHORT = { life: 'Alatau Life', plaza: 'Alatau Plaza Residence', eco: 'Alatau Eco Park' };
  const MON = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

  /* ---------- иконки (линейные, 24×24) ---------- */
  /* иконки: Lucide (ISC) и логотипы соцсетей Simple Icons (CC0) */
  const P = {"yt": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"4\"/> <path d=\"m10 9 5 3-5 3z\"/>", "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\"/> <path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"/> <path d=\"M2 12h20\"/>", "arrow": "<path d=\"M5 12h14\"/> <path d=\"m12 5 7 7-7 7\"/>", "back": "<path d=\"m12 19-7-7 7-7\"/> <path d=\"M19 12H5\"/>", "close": "<path d=\"M18 6 6 18\"/> <path d=\"m6 6 12 12\"/>", "down": "<path d=\"m6 9 6 6 6-6\"/>", "check": "<path d=\"M20 6 9 17l-5-5\"/>", "heart": "<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/>", "phone": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"/>", "user": "<circle cx=\"12\" cy=\"8\" r=\"5\"/> <path d=\"M20 21a8 8 0 0 0-16 0\"/>", "users": "<path d=\"M18 21a8 8 0 0 0-16 0\"/> <circle cx=\"10\" cy=\"8\" r=\"5\"/> <path d=\"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3\"/>", "chat": "<path d=\"M7.9 20A9 9 0 1 0 4 16.1L2 22Z\"/>", "cal": "<path d=\"M8 2v4\"/> <path d=\"M16 2v4\"/> <rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/> <path d=\"M3 10h18\"/> <path d=\"M8 14h.01\"/> <path d=\"M12 14h.01\"/> <path d=\"M16 14h.01\"/> <path d=\"M8 18h.01\"/> <path d=\"M12 18h.01\"/> <path d=\"M16 18h.01\"/>", "key": "<path d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\"/> <circle cx=\"16.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/>", "home": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"/> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/>", "building": "<path d=\"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z\"/> <path d=\"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2\"/> <path d=\"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2\"/> <path d=\"M10 6h4\"/> <path d=\"M10 10h4\"/> <path d=\"M10 14h4\"/> <path d=\"M10 18h4\"/>", "ruler": "<path d=\"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z\"/> <path d=\"m14.5 12.5 2-2\"/> <path d=\"m11.5 9.5 2-2\"/> <path d=\"m8.5 6.5 2-2\"/> <path d=\"m17.5 15.5 2-2\"/>", "stairs": "<path d=\"m3 8 4-4 4 4\"/> <path d=\"M7 4v16\"/> <path d=\"M11 12h10\"/> <path d=\"M11 16h7\"/> <path d=\"M11 20h4\"/>", "door": "<path d=\"M13 4h3a2 2 0 0 1 2 2v14\"/> <path d=\"M2 20h3\"/> <path d=\"M13 20h9\"/> <path d=\"M10 12v.01\"/> <path d=\"M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z\"/>", "layers": "<path d=\"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z\"/> <path d=\"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65\"/> <path d=\"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65\"/>", "ceil": "<polyline points=\"8 18 12 22 16 18\"/> <polyline points=\"8 6 12 2 16 6\"/> <line x1=\"12\" x2=\"12\" y1=\"2\" y2=\"22\"/>", "bank": "<line x1=\"3\" x2=\"21\" y1=\"22\" y2=\"22\"/> <line x1=\"6\" x2=\"6\" y1=\"18\" y2=\"11\"/> <line x1=\"10\" x2=\"10\" y1=\"18\" y2=\"11\"/> <line x1=\"14\" x2=\"14\" y1=\"18\" y2=\"11\"/> <line x1=\"18\" x2=\"18\" y1=\"18\" y2=\"11\"/> <polygon points=\"12 2 20 7 4 7\"/>", "wallet": "<path d=\"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1\"/> <path d=\"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4\"/>", "percent": "<line x1=\"19\" x2=\"5\" y1=\"5\" y2=\"19\"/> <circle cx=\"6.5\" cy=\"6.5\" r=\"2.5\"/> <circle cx=\"17.5\" cy=\"17.5\" r=\"2.5\"/>", "calc": "<rect width=\"16\" height=\"20\" x=\"4\" y=\"2\" rx=\"2\"/> <line x1=\"8\" x2=\"16\" y1=\"6\" y2=\"6\"/> <line x1=\"16\" x2=\"16\" y1=\"14\" y2=\"18\"/> <path d=\"M16 10h.01\"/> <path d=\"M12 10h.01\"/> <path d=\"M8 10h.01\"/> <path d=\"M12 14h.01\"/> <path d=\"M8 14h.01\"/> <path d=\"M12 18h.01\"/> <path d=\"M8 18h.01\"/>", "share": "<circle cx=\"18\" cy=\"5\" r=\"3\"/> <circle cx=\"6\" cy=\"12\" r=\"3\"/> <circle cx=\"18\" cy=\"19\" r=\"3\"/> <line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\"/> <line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\"/>", "file": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/> <path d=\"M12 18v-6\"/> <path d=\"m9 15 3 3 3-3\"/>", "compare": "<circle cx=\"5\" cy=\"6\" r=\"3\"/> <path d=\"M12 6h5a2 2 0 0 1 2 2v7\"/> <path d=\"m15 9-3-3 3-3\"/> <circle cx=\"19\" cy=\"18\" r=\"3\"/> <path d=\"M12 18H7a2 2 0 0 1-2-2V9\"/> <path d=\"m9 15 3 3-3 3\"/>", "spark": "<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/> <path d=\"M20 3v4\"/> <path d=\"M22 5h-4\"/> <path d=\"M4 17v2\"/> <path d=\"M5 18H3\"/>", "search": "<circle cx=\"11\" cy=\"11\" r=\"8\"/> <path d=\"m21 21-4.3-4.3\"/>", "filter": "<line x1=\"21\" x2=\"14\" y1=\"4\" y2=\"4\"/> <line x1=\"10\" x2=\"3\" y1=\"4\" y2=\"4\"/> <line x1=\"21\" x2=\"12\" y1=\"12\" y2=\"12\"/> <line x1=\"8\" x2=\"3\" y1=\"12\" y2=\"12\"/> <line x1=\"21\" x2=\"16\" y1=\"20\" y2=\"20\"/> <line x1=\"12\" x2=\"3\" y1=\"20\" y2=\"20\"/> <line x1=\"14\" x2=\"14\" y1=\"2\" y2=\"6\"/> <line x1=\"8\" x2=\"8\" y1=\"10\" y2=\"14\"/> <line x1=\"16\" x2=\"16\" y1=\"18\" y2=\"22\"/>", "grid": "<rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"/> <rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"/> <rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"/> <rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"/>", "car": "<path d=\"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2\"/> <circle cx=\"7\" cy=\"17\" r=\"2\"/> <path d=\"M9 17h6\"/> <circle cx=\"17\" cy=\"17\" r=\"2\"/>", "box": "<path d=\"m7.5 4.27 9 5.15\"/> <path d=\"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z\"/> <path d=\"m3.3 7 8.7 5 8.7-5\"/> <path d=\"M12 22V12\"/>", "shop": "<path d=\"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7\"/> <path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\"/> <path d=\"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4\"/> <path d=\"M2 7h20\"/> <path d=\"M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7\"/>", "school": "<path d=\"M14 22v-4a2 2 0 1 0-4 0v4\"/> <path d=\"m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2\"/> <path d=\"M18 5v17\"/> <path d=\"m4 6 8-4 8 4\"/> <path d=\"M6 5v17\"/> <circle cx=\"12\" cy=\"9\" r=\"2\"/>", "mall": "<path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\"/> <path d=\"M3 6h18\"/> <path d=\"M16 10a4 4 0 0 1-8 0\"/>", "mosque": "<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9\"/> <path d=\"M20 3v4\"/> <path d=\"M22 5h-4\"/>", "plane": "<path d=\"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z\"/>", "face": "<path d=\"M3 7V5a2 2 0 0 1 2-2h2\"/> <path d=\"M17 3h2a2 2 0 0 1 2 2v2\"/> <path d=\"M21 17v2a2 2 0 0 1-2 2h-2\"/> <path d=\"M7 21H5a2 2 0 0 1-2-2v-2\"/> <path d=\"M8 14s1.5 2 4 2 4-2 4-2\"/> <path d=\"M9 9h.01\"/> <path d=\"M15 9h.01\"/>", "lock": "<circle cx=\"12\" cy=\"16\" r=\"1\"/> <rect x=\"3\" y=\"10\" width=\"18\" height=\"12\" rx=\"2\"/> <path d=\"M7 10V7a5 5 0 0 1 10 0v3\"/>", "shield": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"/> <path d=\"m9 12 2 2 4-4\"/>", "cam": "<path d=\"M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97\"/> <path d=\"M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z\"/> <path d=\"M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15\"/> <path d=\"M2 21v-4\"/> <path d=\"M7 9h.01\"/>", "lift": "<path d=\"m3 16 4 4 4-4\"/> <path d=\"M7 20V4\"/> <path d=\"m21 8-4-4-4 4\"/> <path d=\"M17 4v16\"/>", "mute": "<path d=\"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z\"/> <line x1=\"22\" x2=\"16\" y1=\"9\" y2=\"15\"/> <line x1=\"16\" x2=\"22\" y1=\"9\" y2=\"15\"/>", "tree": "<path d=\"M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z\"/> <path d=\"M7 16v6\"/> <path d=\"M13 19v3\"/> <path d=\"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5\"/>", "sofa": "<path d=\"M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3\"/> <path d=\"M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z\"/> <path d=\"M4 18v2\"/> <path d=\"M20 18v2\"/> <path d=\"M12 4v9\"/>", "film": "<path d=\"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z\"/> <path d=\"m6.2 5.3 3.1 3.9\"/> <path d=\"m12.4 3.4 3.1 4\"/> <path d=\"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z\"/>", "kid": "<path d=\"M9 12h.01\"/> <path d=\"M15 12h.01\"/> <path d=\"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5\"/> <path d=\"M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1\"/>", "doc": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/> <path d=\"M10 9H8\"/> <path d=\"M16 13H8\"/> <path d=\"M16 17H8\"/>", "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\"/> <polyline points=\"12 6 12 12 16 14\"/>", "gift": "<rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"/> <path d=\"M12 8v13\"/> <path d=\"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7\"/> <path d=\"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5\"/>", "tag": "<path d=\"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z\"/> <circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/>", "eye": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"/> <circle cx=\"12\" cy=\"12\" r=\"3\"/>", "cube": "<path d=\"M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2\"/> <path d=\"m15.194 13.707 3.814 1.86-1.86 3.814\"/> <path d=\"M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4\"/>", "bell": "<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\"/> <path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\"/>", "pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"/> <circle cx=\"12\" cy=\"10\" r=\"3\"/>", "star": "<polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/>", "vote": "<path d=\"M7 10v12\"/> <path d=\"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z\"/>", "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\"/> <path d=\"M12 2v2\"/> <path d=\"M12 20v2\"/> <path d=\"m4.93 4.93 1.41 1.41\"/> <path d=\"m17.66 17.66 1.41 1.41\"/> <path d=\"M2 12h2\"/> <path d=\"M20 12h2\"/> <path d=\"m6.34 17.66-1.41 1.41\"/> <path d=\"m19.07 4.93-1.41 1.41\"/>", "play": "<polygon points=\"6 3 20 12 6 21 6 3\"/>", "send": "<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\"/> <path d=\"m21.854 2.147-10.94 10.939\"/>", "menu": "<line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\"/> <line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\"/> <line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\"/>", "info": "<circle cx=\"12\" cy=\"12\" r=\"10\"/> <path d=\"M12 16v-4\"/> <path d=\"M12 8h.01\"/>", "map": "<path d=\"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z\"/> <path d=\"M15 5.764v15\"/> <path d=\"M9 3.236v15\"/>", "route": "<circle cx=\"6\" cy=\"19\" r=\"3\"/> <path d=\"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15\"/> <circle cx=\"18\" cy=\"5\" r=\"3\"/>", "quiz": "<path d=\"m3 17 2 2 4-4\"/> <path d=\"m3 7 2 2 4-4\"/> <path d=\"M13 6h8\"/> <path d=\"M13 12h8\"/> <path d=\"M13 18h8\"/>", "sparkle": "<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/>", "trend": "<polyline points=\"22 17 13.5 8.5 8.5 13.5 2 7\"/> <polyline points=\"16 17 22 17 22 11\"/>", "printer": "<path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"/> <path d=\"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6\"/> <rect x=\"6\" y=\"14\" width=\"12\" height=\"8\" rx=\"1\"/>", "coins": "<circle cx=\"8\" cy=\"8\" r=\"6\"/> <path d=\"M18.09 10.37A6 6 0 1 1 10.34 18\"/> <path d=\"M7 6h1v4\"/> <path d=\"m16.71 13.88.7.71-2.82 2.82\"/>", "briefcase": "<path d=\"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\"/> <rect width=\"20\" height=\"14\" x=\"2\" y=\"6\" rx=\"2\"/>", "hammer": "<path d=\"m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9\"/> <path d=\"m18 15 4-4\"/> <path d=\"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5\"/>", "award": "<path d=\"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526\"/> <circle cx=\"12\" cy=\"8\" r=\"6\"/>", "handshake": "<path d=\"m11 17 2 2a1 1 0 1 0 3-3\"/> <path d=\"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4\"/> <path d=\"m21 3 1 11h-2\"/> <path d=\"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3\"/> <path d=\"M3 4h8\"/>", "warehouse": "<path d=\"M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z\"/> <path d=\"M6 18h12\"/> <path d=\"M6 14h12\"/> <rect width=\"12\" height=\"12\" x=\"6\" y=\"10\"/>", "parking": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/> <path d=\"M9 17V7h4a3 3 0 0 1 0 6H9\"/>", "insta": "F<path d=\"M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077\"/>", "tiktok": "F<path d=\"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z\"/>", "tg": "F<path d=\"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z\"/>", "wa": "F<path d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z\"/>"};
  const icon = (n, cls = '') => { const p = P[n] || P.info, f = p[0] === 'F'; return `<svg class="i ${f ? 'fill ' : ''}${cls}" viewBox="0 0 24 24" aria-hidden="true">${f ? p.slice(1) : p}</svg>`; };
  const ROOF = '<svg class="roof" viewBox="0 0 493 147" aria-hidden="true"><path d="M246.5 0L0 117V146.4L246.5 29.3L493 146.4V117Z"/></svg>';
  const benefitIcon = t => /face/i.test(t) ? 'face' : /замк|touch/i.test(t) ? 'lock' : /двор/i.test(t) ? 'tree' : /шум/i.test(t) ? 'mute' : /камер|видео/i.test(t) ? 'cam' : /лифт/i.test(t) ? 'lift' : /паркинг/i.test(t) ? 'car' : /потол/i.test(t) ? 'ceil' : /холл/i.test(t) ? 'sofa' : /кино/i.test(t) ? 'film' : /дет/i.test(t) ? 'kid' : /ддс|ддц|дду|договор/i.test(t) ? 'doc' : /рассроч/i.test(t) ? 'wallet' : /отделк/i.test(t) ? 'home' : 'check';
  const placeIcon = t => /школ/i.test(t) ? 'school' : /universit|университет|казубт|mnu|колледж/i.test(t) ? 'school' : /mega|молл|трц/i.test(t) ? 'mall' : /мечет/i.test(t) ? 'mosque' : /аэропорт/i.test(t) ? 'plane' : 'pin';

  /* ---------- метки ЖК (считаются сами из данных и сегодняшней даты) ---------- */
  const META = {
    life: { cls: 'Комфорт+', pay: ['mort'], service: '2027-09-30', floors: 9, ceil: '3 м', pano: 'https://kuula.co/share/LTnfw?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1' },
    plaza: { cls: 'Бизнес', pay: ['inst', 'mort'], service: '2027-06-30', floors: 17, ceil: null, queues: 2, pano: 'https://qubedev.aerials.qubehub.ai/pano/28' },
    eco: { cls: 'Комфорт+', pay: ['mort'], service: null, built: true, floors: 9, ceil: '3 м', pano: null }
  };
  const PAYN = { mort: 'Ипотека', inst: 'Рассрочка', full: '100% оплата' };
  const countB = b => FL.filter(f => f.b === b).length;
  function status(b, now = new Date()) {
    const m = META[b];
    if (m.service) {
      const d = new Date(m.service), months = (d.getFullYear() - now.getFullYear()) * 12 + d.getMonth() - now.getMonth();
      if (months <= 0) return { t: 'Дом сдан', k: 'done' };
      return { t: `Сдача: ${Math.floor(d.getMonth() / 3) + 1} квартал ${d.getFullYear()}`, k: 'build' };
    }
    if (m.built) return { t: 'Дом построен', k: 'done' };
    return { t: `${m.queues} очереди`, k: 'build' };
  }
  function tags(b) {
    const n = countB(b), out = [{ t: META[b].cls, i: 'star', k: 'cls' }, { t: status(b).t, i: status(b).k === 'done' ? 'key' : 'clock', k: 'status' }];
    if (n <= 10) out.push({ t: (n === 1 ? 'Последняя квартира' : `Осталось ${n} ${plural(n, 'квартира', 'квартиры', 'квартир')}`), i: 'bell', k: 'hot' });
    META[b].pay.forEach(p => out.push({ t: PAYN[p], i: p === 'inst' ? 'wallet' : 'bank', k: 'pay' }));
    return out;
  }

  /* ---------- статистика по базе ---------- */
  const avg = {};
  for (const f of FL) { const k = f.b + Math.min(f.r, 4); (avg[k] ||= { s: 0, n: 0 }); avg[k].s += f.m2; avg[k].n++; }
  const avgM2 = f => { const a = avg[f.b + Math.min(f.r, 4)]; return a.s / a.n; };
  const delta = f => Math.round((f.m2 / avgM2(f) - 1) * 100);
  const samePlan = f => FL.filter(x => x.pn === f.pn).length;
  const floorsOf = f => f.b === 'plaza' && f.q === 2 ? null : META[f.b].floors;
  const stats = b => {
    const L = FL.filter(f => f.b === b), rows = {};
    for (const f of L) { const r = Math.min(f.r, 4); const x = rows[r] ||= { a: 1e9, p: 1e12, n: 0 }; x.a = Math.min(x.a, f.a); x.p = Math.min(x.p, f.p); x.n++; }
    return { n: L.length, min: Math.min(...L.map(f => f.p)), amin: Math.min(...L.map(f => f.a)), rows: Object.entries(rows).sort((a, b) => a[0] - b[0]) };
  };
  const ST = Object.fromEntries(ORDER.map(b => [b, stats(b)]));
  const rName = r => +r === 4 ? '4+ комнаты' : r + '-комнатная';
  const kv = n => `${n} ${plural(n, 'квартира', 'квартиры', 'квартир')}`;
  const annuity = (L, years, rate = .07) => { const r = rate / 12, n = years * 12; return L * r / (1 - (1 + r) ** -n); };

  /* ---------- ИИ-подбор: разбор фразы алгоритмами ---------- */
  // места по категориям; координаты — OpenStreetMap
  const CATS = [['sight', 'Достопримечательности', 'star'], ['lrt', 'ЛРТ и транспорт', 'route'], ['mall', 'ТРЦ', 'mall'], ['edu', 'Образование', 'school'], ['med', 'Медицина', 'shield'], ['park', 'Парки', 'tree']];
  const LM = [
    ['baiterek', 'Байтерек', 51.1283, 71.4305, 'star', 'sight'], ['akorda', 'Ак Орда', 51.1257, 71.4468, 'building', 'sight'], ['khan', 'Хан Шатыр', 51.1325, 71.4039, 'mall', 'sight'],
    ['expo', 'EXPO', 51.0890, 71.4158, 'cube', 'sight'], ['arena', 'Астана Арена', 51.1081, 71.4024, 'star', 'sight'], ['arch', 'Арка Мәңгілік Ел', 51.1043, 71.4301, 'star', 'sight'],
    ['l-nura', 'ЛРТ Нура', 51.0811, 71.4000, 'route', 'lrt'], ['l-uni', 'ЛРТ Университет', 51.0887, 71.4028, 'route', 'lrt'], ['l-arena', 'ЛРТ Астана Арена', 51.1061, 71.4090, 'route', 'lrt'],
    ['l-sygan', 'ЛРТ Сыганак', 51.1220, 71.4131, 'route', 'lrt'], ['l-baiterek', 'ЛРТ Байтерек', 51.1232, 71.4288, 'route', 'lrt'], ['l-mangilik', 'ЛРТ Мангилик Ел', 51.0559, 71.4188, 'route', 'lrt'],
    ['vokzal', 'Вокзал Нурлы Жол', 51.1124, 71.5300, 'route', 'lrt'], ['air', 'Аэропорт', 51.0222, 71.4669, 'plane', 'lrt'],
    ['mega', 'MEGA Silk Way', 51.0891, 71.4073, 'mall', 'mall'], ['khanm', 'Хан Шатыр', 51.1325, 71.4039, 'mall', 'mall'], ['euro', 'Euromall', 51.1729, 71.3794, 'mall', 'mall'],
    ['sauran', 'Sauran', 51.1184, 71.4162, 'mall', 'mall'], ['adp', 'Abu Dhabi Plaza', 51.1221, 71.4280, 'mall', 'mall'], ['amall', 'Astana Mall', 51.1401, 71.4661, 'mall', 'mall'],
    ['nu', 'Nazarbayev University', 51.0921, 71.3976, 'school', 'edu'], ['aitu', 'Astana IT University', 51.0909, 71.4184, 'school', 'edu'], ['kaztb', 'КазУТБ', 51.1446, 71.3697, 'school', 'edu'],
    ['kazguu', 'Университет КАЗГЮУ', 51.1489, 71.3797, 'school', 'edu'], ['neotech', 'Neotech School', 51.1383, 71.3715, 'school', 'edu'], ['binom', 'Binom School', 51.0798, 71.4345, 'school', 'edu'],
    ['m-mat', 'Центр материнства и детства', 51.1248, 71.4068, 'shield', 'med'], ['m-card', 'Кардиохирургический центр', 51.1185, 71.4040, 'shield', 'med'], ['m-gb2', 'Горбольница №2', 51.0841, 71.4092, 'shield', 'med'],
    ['m-cg', 'Центральный госпиталь', 51.0836, 71.4029, 'shield', 'med'], ['m-db3', 'Детская больница №3', 51.0829, 71.4194, 'shield', 'med'],
    ['p-nu', 'NU Park', 51.0875, 71.3993, 'tree', 'park'], ['p-bot', 'Ботанический сад', 51.1075, 71.4171, 'tree', 'park'], ['p-pres', 'Президентский парк', 51.1135, 71.4443, 'tree', 'park'],
    ['p-green', 'Парк Бухарест', 51.1295, 71.3936, 'tree', 'park'], ['p-ata', 'Парк Ататюрка', 51.1520, 71.4314, 'tree', 'park']];
  const hav = (a, b) => { const R = 6371, r = Math.PI / 180, dl = (b[0] - a[0]) * r, dn = (b[1] - a[1]) * r; const h = Math.sin(dl / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dn / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
  const carMin = km => Math.round(km * 1.35 / 30 * 60 + 3);
  const NEAR = { school: /школ/i, uni: /университет|казубт|mnu|колледж/i, mall: /mega/i, mosque: /мечет/i, airport: /аэропорт/i };
  const NEARN = { school: 'школа', uni: 'вуз', mall: 'ТРЦ', mosque: 'мечеть', airport: 'аэропорт', lrt: 'ЛРТ', edu: 'образование', med: 'медицина', park: 'парк' };
  // минуты до ближайшего: по списку «рядом» с сайта и по координатам мест (на машине)
  const GEOK = { lrt: l => l[0].startsWith('l-'), mall: l => l[5] === 'mall', edu: l => l[5] === 'edu', med: l => l[5] === 'med', park: l => l[5] === 'park' };
  const nearMin = (b, k) => {
    let m = null; const re = NEAR[k] || (k === 'edu' ? /школ|университет|казубт|mnu|колледж/i : null);
    if (re) for (const [n, t] of ZK[b].nearby) if (re.test(n) && (m === null || t < m)) m = t;
    if (GEOK[k] && ZK[b].geo) for (const l of LM) if (GEOK[k](l)) { const t = carMin(hav(ZK[b].geo, [l[2], l[3]])); if (m === null || t < m) m = t; }
    return m;
  };
  function parse(text) {
    const t = ' ' + text.toLowerCase().replace(/ё/g, 'е') + ' ', q = {}, got = [];
    if (/life|лайф/.test(t)) { q.zk = 'life'; got.push('Alatau Life'); }
    else if (/плаз|plaza/.test(t)) { q.zk = 'plaza'; got.push('Alatau Plaza Residence'); }
    else if (/эко|eco/.test(t)) { q.zk = 'eco'; got.push('Eco Park'); }
    const r = t.match(/(\d)\s*-?\s*(к\b|х|ком|комн)/) || (/(одн|однуш|студи)/.test(t) && [0, '1']) || (/(двух|двуш)/.test(t) && [0, '2']) || (/(трех|треш)/.test(t) && [0, '3']) || (/(четыр|больш\w* сем|многодет)/.test(t) && [0, '4']);
    if (r) { q.rooms = [Math.min(4, +r[1])]; got.push(rName(q.rooms[0])); }
    const mm = t.match(/до\s*(\d+[.,]?\d*)\s*(млн|миллион)/); if (mm) { q.priceMax = parseFloat(mm[1].replace(',', '.')); got.push(`до ${mm[1]} млн ₸`); }
    const pm = t.replace(/(\d)\s+(\d{3})/g, '$1$2').match(/(\d{2,6})\s*(тыс|т\b|к\b|000)?\s*(в мес|в месяц|ежемес|платеж|платёж)/) || t.replace(/(\d)\s+(\d{3})/g, '$1$2').match(/(платеж|платёж|в месяц)\D{0,12}(\d{2,6})/);
    if (pm) { let v = parseFloat(pm[1].match(/\d/) ? pm[1] : pm[2]); if (v < 2000) v *= 1000; if (v >= 50000) { q.monthMax = v; got.push(`платёж до ${fmt(v)} ₸`); } }
    const am = t.match(/(от|больше|не меньше)\s*(\d{2,3})\s*(м|кв)/); if (am) { q.areaMin = +am[2]; got.push(`от ${am[2]} м²`); }
    if (/не перв|не на перв/.test(t)) { q.notFirst = true; got.push('не первый этаж'); }
    if (/высок|вид|верхн|последн/.test(t)) { q.floorMin = 6; got.push('этаж повыше'); }
    for (const [k, re] of Object.entries({ school: /школ|ребен|дет[еяи]/, uni: /универ|вуз|студент|учеб/, lrt: /лрт|метро|станци/, mall: /мега|mega|трц|торгов/, med: /больниц|поликлиник|клиник|медиц/, park: /парк|сквер/, mosque: /мечет/, airport: /аэропорт/ })) if (re.test(t)) { q.near = k; got.push('рядом ' + NEARN[k]); break; }
    if (/рассроч/.test(t)) { q.pay = 'inst'; got.push('рассрочка'); } else if (/ипотек/.test(t)) { q.pay = 'mort'; got.push('ипотека'); }
    if (/готов|сдан|построен|сразу заех|въехать сейчас/.test(t)) { q.ready = true; got.push('готовый дом'); }
    if (/дешев|недорог|эконом|бюджет/.test(t)) { q.sort = 'price'; got.push('сначала дешевле'); }
    if (/инвест/.test(t)) { q.sort = 'm2'; got.push('ниже цена за м²'); }
    if (/сем[ьея]/.test(t) && !q.rooms) { q.rooms = [3, 4]; got.push('3 и больше комнат'); }
    // «покажи 5 самых дешёвых», «10 вариантов» — сколько квартир показать (по умолчанию 3, не больше 10)
    const cn = t.match(/\s(\d{1,2})\s*(сам|лучш|дешев|недорог|вариант|квартир|планиров|шт)/); if (cn && +cn[1] >= 1) q.n = Math.min(10, +cn[1]);
    return { q, got };
  }
  function match(f, q) {
    if (q.zk && f.b !== q.zk) return false;
    if (q.rooms && q.rooms.length && !q.rooms.includes(Math.min(f.r, 4))) return false;
    if (q.priceMax && f.p > q.priceMax * 1e6) return false;
    if (q.monthMax && monthly(f.p) > q.monthMax) return false;
    if (q.areaMin && f.a < q.areaMin) return false;
    if (q.notFirst && f.fl <= 2) return false;
    if (q.floorMin && f.fl < q.floorMin) return false;
    if (q.near && !(nearMin(f.b, q.near) <= 12)) return false;
    if (q.pay && !META[f.b].pay.includes(q.pay)) return false;
    if (q.ready && status(f.b).k !== 'done') return false;
    return true;
  }
  const sortBy = (L, s) => s === 'm2' ? L.sort((a, b) => a.m2 - b.m2) : L.sort((a, b) => a.p - b.p);
  // ответы ассистента — только из базы, без выдумок
  // фразы ответа — отдельными кусками, чтобы переключатель языка нашёл каждую в словаре
  const sp = x => `<span>${x}</span>`, gotS = got => sp('Понял:') + ' ' + got.map(sp).join(', ') + '.';
  function answer(text) {
    const t = text.toLowerCase().replace(/ё/g, 'е');
    if (/^(привет|салем|здравствуй|hi|hello)/.test(t.trim())) return { text: `Здравствуйте! Я подбираю квартиры по базе Baqyt Group: ${FL.length} квартир в трёх ЖК. Напишите, например: «двушка до 30 млн рядом со школой».` };
    if (/паркинг|машиномест/.test(t)) return { text: `Паркинг: ${EX['Parking place'].n} мест, ${area(EX['Parking place'].amin)}–${area(EX['Parking place'].amax)} м², от ${mln(EX['Parking place'].min)} ₸.` };
    if (/кладов/.test(t)) return { text: `Кладовые: ${EX.Storeroom.n} шт., ${area(EX.Storeroom.amin)}–${area(EX.Storeroom.amax)} м², от ${fmt(EX.Storeroom.min)} ₸.` };
    if (/коммерц|офис|помещени/.test(t)) return { text: 'Коммерческих помещений в базе сайта сейчас нет. Оставьте заявку, и менеджер расскажет о планах.' };
    if (/когда|сдач|срок/.test(t) && !/рассроч/.test(t)) return { text: ORDER.map(b => `${ZK[b].name}: ${sp(status(b).t)}${status(b).sub ? ' (' + sp(status(b).sub) + ')' : ''}`).join('. ') + '.' };
    if (/рассроч/.test(t) && !/(\d)/.test(t) && parse(text).got.length === 1) return { text: sp(`Рассрочка от застройщика есть в Alatau Plaza Residence: ${kv(ST.plaza.n)} в продаже, от ${mln(ST.plaza.min)} ₸.`) + ' ' + sp('Условия рассчитает менеджер.') };
    if (/адрес|где наход|где этот/.test(t)) return { text: ORDER.map(b => `${ZK[b].name}: ${sp(ZK[b].addr)}, ${sp(ZK[b].area)}`).join('. ') + '.' };
    const { q, got } = parse(text);
    let L = FL.filter(f => match(f, q)); sortBy(L, q.sort);
    if (!got.length) return { text: sp('Не понял, что искать. Напишите комнаты, бюджет или что должно быть рядом.') + ' ' + sp('Например: «3 комнаты, платёж до 250 000, рядом школа».'), got };
    if (!L.length) return { text: gotS(got) + ' ' + sp('Таких квартир сейчас нет.') + ' ' + sp('Попробуйте поднять бюджет или убрать одно условие.'), got, q };
    const by = ORDER.filter(b => L.some(f => f.b === b)).map(b => `${SHORT[b]} — ${L.filter(f => f.b === b).length}`).join(', ');
    // в карточках — разные планировки: одинаковые квартиры с соседних этажей не повторяем
    const pl = new Set(), show = L.filter(f => { const k = f.b + f.r + "-" + f.a; return !pl.has(k) && pl.add(k); }).slice(0, q.n || 3);
    const top = q.sort === 'm2' ? `Самая низкая цена за м² — ${fmt(L[0].m2)} ₸ (${mln(L[0].p)} ₸ за квартиру).` : `Самая доступная — ${mln(L[0].p)} ₸, ${fmt(monthly(L[0].p))} ₸ в месяц.`;
    return { text: `${gotS(got)} ${sp('Подходящих квартир: ' + L.length)} (${by}). ${sp(top)}`, got, q, flats: show, n: L.length };
  }

  /* ---------- страница квартиры ---------- */
  function floorPlan(f) {
    const k = SLOTS[f.b + '-' + f.e] || 4, same = FL.filter(x => x.b === f.b && x.q === f.q && x.e === f.e && x.fl === f.fl);
    let h = '';
    for (let s = 0; s < k; s++) {
      const x = same.find(y => y.s === s);
      h += x ? `<button class="fp-cell ${x.id === f.id ? 'cur' : 'av'}" data-flat="${x.id}"><b>${x.r}к</b><span>${area(x.a)} м²</span><small>кв. ${x.n}</small></button>` : `<div class="fp-cell sold"><span>продана</span></div>`;
    }
    return `<div class="fp"><div class="fp-row" style="--k:${k}">${h}</div><div class="fp-hall">Лестница и лифты · подъезд ${f.e} · ${f.fl} этаж</div></div>`;
  }
  function entranceGrid(f) {
    const k = SLOTS[f.b + '-' + f.e] || 4, L = FL.filter(x => x.b === f.b && x.q === f.q && x.e === f.e);
    const top = floorsOf(f) || Math.max(...L.map(x => x.fl)), rows = [];
    for (let fl = top; fl >= 2; fl--) {
      let r = `<span class="eg-fl">${fl}</span>`;
      for (let s = 0; s < k; s++) { const x = L.find(y => y.fl === fl && y.s === s); r += x ? `<button class="eg-c ${x.id === f.id ? 'cur' : 'av'}" data-flat="${x.id}" title="кв. ${x.n}, ${roomsWord(x.r)}, ${mln(x.p)} ₸">${x.r}</button>` : '<i class="eg-c sold"></i>'; }
      rows.push(`<div class="eg-r" style="--k:${k}">${r}</div>`);
    }
    const total = (top - 1) * k, sold = Math.max(0, total - L.length);
    return `${sold ? `<div class="eg-nb">${icon('users')}<span>В этом подъезде уже продано <b>${sold} из ${total}</b> квартир. Соседи появятся в кабинете, когда дом заселят.</span></div>` : ''}<div class="eg">${rows.join('')}</div><div class="eg-leg"><span><i class="eg-c av"></i>в продаже</span><span><i class="eg-c cur"></i>эта квартира</span><span><i class="eg-c sold"></i>продана или нет в продаже</span></div>`;
  }
  function similar(f) {
    return FL.filter(x => x.id !== f.id && Math.min(x.r, 4) === Math.min(f.r, 4) && Math.abs(x.p - f.p) / f.p < .15)
      .sort((a, b) => (a.pn === f.pn) - (b.pn === f.pn) || Math.abs(a.p - f.p) - Math.abs(b.p - f.p)).slice(0, 4);
  }
  /* мини-карта: дом и ближайшие места по категориям */
  function miniMap(f) {
    const z = ZK[f.b], g = z.geo; if (!g) return '';
    const KX = Math.cos(g[0] * Math.PI / 180), kmX = lo => (lo - g[1]) * 111.32 * KX, kmY = la => (g[0] - la) * 111.32;
    const near = ['lrt', 'mall', 'edu', 'med', 'park'].map(c => LM.filter(l => l[5] === c).map(l => ({ l, c, km: hav(g, [l[2], l[3]]) })).sort((x, y) => x.km - y.km)[0]).filter(Boolean).sort((x, y) => x.km - y.km).slice(0, 4);
    const span = Math.min(22, Math.max(4, ...near.slice(0, 3).map(n => Math.max(Math.abs(kmX(n.l[3])) * 2.5, Math.abs(kmY(n.l[2])) * 2.5 * 4 / 3))));
    const W = 0.8 * 111.32 * KX, H = 0.37 * 111.32, iw = W / span * 100, ih = H / (span * 3 / 4) * 100;
    const fx = (g[1] - 71.05) / 0.8, fy = (51.30 - g[0]) / 0.37;
    const pos = (la, lo) => [50 + kmX(lo) / span * 100, 50 + kmY(la) / (span * 3 / 4) * 100];
    const CN = { lrt: 'Транспорт', mall: 'ТРЦ', edu: 'Учёба', med: 'Медицина', park: 'Парк' };
    return `<div class="mm"><div class="mm-map"><img src="img/map-astana.webp" alt="" loading="lazy" style="width:${iw}%;height:${ih}%;left:${50 - fx * iw}%;top:${50 - fy * ih}%">
      ${near.map((n, i) => { const [x, y] = pos(n.l[2], n.l[3]); return x > 4 && x < 96 && y > 6 && y < 94 ? `<span class="mm-p ${x > 62 ? 'l' : ''}" style="left:${x}%;top:${y}%"><i>${icon(n.l[4])}</i><em>${n.l[1]}</em></span>` : ''; }).join('')}
      <span class="mm-home" style="left:50%;top:50%"><i class="pulse"></i><img src="img/logo.svg" alt=""><b>${SHORT[f.b]}</b></span><span class="osm-c">© OpenStreetMap</span></div>
      <div class="mm-l">${near.map(n => `<div>${icon(n.l[4])}<span><small>${CN[n.c]}</small>${n.l[1]}</span><b class="num">${carMin(n.km)} мин</b></div>`).join('')}</div>
      <div class="mm-f"><span>${icon('car')}время на машине</span><a class="lnk" href="https://2gis.kz/astana/geo/${g[1]},${g[0]}" target="_blank" rel="noopener">${icon('route')}Маршрут в 2ГИС</a></div></div>`;
  }
  /* интерактивная карта окружения: категории выбираются по несколько, карта сама подстраивает масштаб */
  const NCAT = [['lrt', 'ЛРТ и транспорт', 'route'], ['edu', 'Образование', 'school'], ['mall', 'ТРЦ', 'mall'], ['med', 'Медицина', 'shield'], ['park', 'Парки', 'tree'], ['sight', 'Достопримечательности', 'star']];
  const NCN = Object.fromEntries(NCAT.map(([k, t]) => [k, t]));
  function nearPlaces(b) {
    const g = ZK[b].geo, seen = new Set();
    return NCAT.flatMap(([c]) => LM.filter(l => l[5] === c).map(l => ({ l, c, km: hav(g, [l[2], l[3]]) })).filter(x => x.km < 9).sort((x, y) => x.km - y.km).slice(0, 4))
      .filter(x => { const k = x.l[1] + x.c; if (seen.has(x.l[1])) return false; seen.add(x.l[1]); return true; });
  }
  function nearMap(b, sel = ['lrt', 'edu', 'mall']) {
    const z = ZK[b], g = z.geo; if (!g) return '';
    const P = nearPlaces(b), cnt = c => P.filter(p => p.c === c).length;
    return `<div class="nm" data-nm="${b}" data-sel="${sel.join(',')}">
      <div class="nm-map"><img class="nm-base" src="img/map-astana.webp" alt=""><svg class="nm-svg"><line/></svg>
        <div class="nm-pins">${P.map((p, i) => `<button type="button" class="nm-p c-${p.c}" data-p="${i}" aria-label="${p.l[1]}"><i>${icon(p.l[4])}</i><em>${p.l[1]}<small class="num">${carMin(p.km)} мин</small></em></button>`).join('')}</div>
        <span class="nm-home"><i class="pulse"></i><img src="img/logo.svg" alt=""><b>${SHORT[b]}</b></span>
        <div class="nm-zoom"><button type="button" class="ico" data-zm="-1" aria-label="Приблизить">+</button><button type="button" class="ico" data-zm="1" aria-label="Отдалить">−</button></div>
        <span class="osm-c">© OpenStreetMap</span></div>
      <div class="nm-cats" role="group" aria-label="Что показать на карте">${NCAT.filter(([c]) => cnt(c)).map(([c, t, i]) => `<button type="button" class="c-${c}" data-c="${c}" aria-pressed="${sel.includes(c)}">${icon(i)}${t}<b class="num">${cnt(c)}</b></button>`).join('')}</div>
      <div class="nm-list"></div>
      <div class="nm-f"><span>${icon('car')}Время на машине, расстояние по прямой</span><a class="lnk" href="https://2gis.kz/astana/geo/${g[1]},${g[0]}" target="_blank" rel="noopener">${icon('route')}Маршрут в 2ГИС</a></div></div>`;
  }
  const q = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  function mountNear(root) {
    qa('.nm', root).forEach(el => {
      const b = el.dataset.nm, g = ZK[b].geo, P = nearPlaces(b), sel = new Set(el.dataset.sel.split(','));
      const KX = Math.cos(g[0] * Math.PI / 180), kmX = lo => (lo - g[1]) * 111.32 * KX, kmY = la => (g[0] - la) * 111.32;
      const map = q('.nm-map', el), base = q('.nm-base', el), pins = qa('.nm-p', el), line = q('.nm-svg line', el);
      let zoom = 1, act = -1;
      function draw() {
        const W = map.clientWidth || 800, H = map.clientHeight || 500, vis = P.map((p, i) => sel.has(p.c) ? i : -1).filter(i => i >= 0);
        const ext = vis.length ? Math.max(...vis.map(i => Math.max(Math.abs(kmX(P[i].l[3])) * 2, Math.abs(kmY(P[i].l[2])) * 2 * W / H))) : 4;
        const span = Math.min(26, Math.max(3, ext * 1.25)) * zoom, spanY = span * H / W;
        const iw = 0.8 * 111.32 * KX / span * 100, ih = 0.37 * 111.32 / spanY * 100, fx = (g[1] - 71.05) / 0.8, fy = (51.30 - g[0]) / 0.37;
        Object.assign(base.style, { width: iw + '%', height: ih + '%', left: (50 - fx * iw) + '%', top: (50 - fy * ih) + '%' });
        const nearest = new Set(NCAT.map(([c]) => vis.find(i => P[i].c === c)).filter(i => i != null));
        pins.forEach((pn, i) => {
          const x = 50 + kmX(P[i].l[3]) / span * 100, y = 50 + kmY(P[i].l[2]) / spanY * 100, on = sel.has(P[i].c) && x > 2 && x < 98 && y > 4 && y < 96;
          pn.style.left = x + '%'; pn.style.top = y + '%'; pn.classList.toggle('on', on); pn.classList.toggle('lb', on && (nearest.has(i) || i === act)); pn.classList.toggle('act', i === act); pn.classList.toggle('l', x > 64);
        });
        q('.nm-svg', el).setAttribute('viewBox', `0 0 ${W} ${H}`);
        if (act >= 0 && sel.has(P[act].c)) { const p = pins[act]; line.setAttribute('x1', W / 2); line.setAttribute('y1', H / 2); line.setAttribute('x2', parseFloat(p.style.left) / 100 * W); line.setAttribute('y2', parseFloat(p.style.top) / 100 * H); line.classList.add('on'); } else line.classList.remove('on');
        q('.nm-list', el).innerHTML = vis.slice().sort((x, y) => P[x].km - P[y].km).slice(0, 9).map(i => { const p = P[i]; return `<button type="button" class="nm-r c-${p.c} ${i === act ? 'on' : ''}" data-p="${i}"><i>${icon(p.l[4])}</i><span><b>${p.l[1]}</b><small>${NCN[p.c]} · ${p.km.toFixed(1).replace('.', ',')} км</small></span><em class="num">${carMin(p.km)} мин</em></button>`; }).join('') || `<p class="nm-none">${icon('info')}Выберите, что показать на карте</p>`;
      }
      el.addEventListener('click', e => {
        const c = e.target.closest('[data-c]'), p = e.target.closest('[data-p]'), zm = e.target.closest('[data-zm]');
        if (c) { const k = c.dataset.c; sel.has(k) ? sel.delete(k) : sel.add(k); c.setAttribute('aria-pressed', sel.has(k)); if (act >= 0 && !sel.has(P[act].c)) act = -1; zoom = 1; draw(); }
        else if (p) { act = +p.dataset.p === act ? -1 : +p.dataset.p; draw(); }
        else if (zm) { zoom = Math.min(2.2, Math.max(.45, zoom * (+zm.dataset.zm > 0 ? 1.35 : 1 / 1.35))); draw(); }
      });
      el.addEventListener('pointerover', e => { const r = e.target.closest('.nm-r'); pins.forEach(x => x.classList.toggle('hl', !!r && x.dataset.p === r.dataset.p)); });
      draw(); new ResizeObserver(() => draw()).observe(map);
    });
  }
  /* три способа покупки: ипотека (программы во вкладках), рассрочка, полная оплата */
  const FULLD = [[25, 3], [50, 5], [100, 10]];
  function payCards(f) {
    const mp = PROGS.filter(g => !g.full && g.u === 'y' && g.zk.includes(f.b)), inst = PROGS.find(g => g.k === 'inst'), hasI = inst.zk.includes(f.b);
    return `<div class="pc3">
      <div class="pc3-c" data-pc="mort"><div class="pc3-h"><span class="pc3-i">${icon('bank')}</span><div><b>Ипотека</b><small>через банки-партнёры</small></div></div>
        <div class="pc3-t" role="tablist">${mp.map((g, i) => `<button type="button" role="tab" data-pg="${g.k}" aria-selected="${!i}">${{ 7: '7-20-25', market: 'Банк', otbasy: 'Отбасы' }[g.k]}</button>`).join('')}</div>
        <div class="pc3-big"><small>Платёж в месяц</small><b class="num" data-o="mm"></b><span class="num" data-o="mr"></span></div>
        <div class="kr"><label>Первый взнос <b data-o="md"></b></label><input type="range" step="5" data-r="md"></div>
        <div class="kr"><label>Срок <b data-o="my"></b></label><input type="range" step="1" data-r="my"></div>
        <p class="pc3-n" data-o="mn"></p>
        <button class="kb pri" data-fx-book>${icon('doc')}Подать заявку в банки</button></div>
      <div class="pc3-c ${hasI ? '' : 'off'}" data-pc="inst"><div class="pc3-h"><span class="pc3-i">${icon('calc')}</span><div><b>Рассрочка</b><small>от застройщика, без банка</small></div></div>
        ${hasI ? `<p class="pc3-n">Взнос, срок и график рассрочки менеджер рассчитает под эту квартиру.</p>
        <ul class="pc3-ul"><li>${icon('check')}Без справок о доходе</li><li>${icon('check')}Без банковских процентов</li></ul>
        <button class="kb pri" data-fx-book>${icon('key')}Оформить рассрочку</button>`
        : `<div class="pc3-no">${icon('info')}<p>В ${SHORT[f.b]} рассрочки нет. Она доступна в ${inst.zk.map(b => SHORT[b]).join(', ')}.</p><a class="kb" href="flats.html#zk-${inst.zk[0]}">${icon('search')}Квартиры с рассрочкой</a></div>
        <ul class="pc3-ul"><li>${icon('check')}Без справок о доходе</li><li>${icon('check')}Без банковских процентов</li></ul>`}</div>
      <div class="pc3-c dark" data-pc="full"><div class="pc3-h"><span class="pc3-i">${icon('wallet')}</span><div><b>Наличными</b><small>скидка за оплату</small></div></div>
        <p class="pc3-n">Чем больше вносите сразу, тем больше скидка. Размер скидки для этой квартиры назовёт менеджер.</p>
        <button class="kb pri" data-call>${icon('phone')}Узнать скидку</button></div>
    </div>`;
  }
  /* о жилом комплексе: фото во вкладках */
  const ZTAB = {
    life: [['Фасад', 'ph_6839859_3', 'Светлый фасад с панорамными окнами и благоустроенная территория вокруг дома.'], ['Двор', 'ph_6839859_1', 'Закрытый двор без машин: детская площадка, зелень и места для отдыха.'], ['Холл', 'ph_6839859_7', 'Холлы с авторским дизайном и зоной ожидания на первом этаже.'], ['Вечером', 'ph_6839859_4', 'Архитектурная подсветка: дом красиво смотрится и вечером.']],
    plaza: [['Фасад', 'ph_5655382_0', 'Современный фасад и две очереди строительства.'], ['Территория', 'ph_5655382_1', 'Озеленённая территория и прогулочные дорожки вокруг комплекса.'], ['Кинорум', 'ph_5655382_3', 'Кинорум для жителей: смотреть фильмы и отдыхать с соседями.'], ['Детская', 'ph_5655382_4', 'Детская игровая комната прямо в доме.']],
    eco: [['Фасад', 'ph_5587279_0', 'Дом уже построен: можно приехать и посмотреть всё вживую.'], ['Двор', 'ph_5587279_4', 'Закрытый двор с зелёной зоной и местами для отдыха.'], ['Площадка', 'ph_5587279_5', 'Детская и спортивная площадки во дворе.'], ['Холл', 'ph_5587279_7', 'Светлый холл с лифтами и навигацией по этажам.']]
  };
  function zkTabs(f) {
    const T = ZTAB[f.b], m = META[f.b]; if (!T) return '';
    const park = ZK[f.b].benefits.some(x => /паркинг/i.test(x));
    return `<section class="fx-sec zkt"><div class="zkt-h"><div><h2>О жилом комплексе ${SHORT[f.b]}</h2><p class="fx-sub">${ZK[f.b].addr} · ${m.cls}${park ? ' · крытый паркинг' : ''}</p></div><a class="kb" href="project.html#${f.b}">${icon('building')}Страница проекта</a></div>
      <div class="zkt-w"><div class="zkt-v">${T.map(([t, p], i) => `<figure class="${i ? '' : 'on'}" data-zv="${i}"><img src="img/${p}.webp" alt="${t}" loading="lazy"></figure>`).join('')}
        <div class="zkt-n"><button type="button" data-zn="-1" aria-label="Назад">${icon('back')}</button><button type="button" data-zn="1" aria-label="Дальше">${icon('arrow')}</button></div></div>
        <div class="zkt-t" role="tablist">${T.map(([t, p, d], i) => `<button type="button" role="tab" data-zt="${i}" aria-selected="${!i}"><img src="img/${p}.webp" alt="" loading="lazy"><span><b>${t}</b><small>${d}</small></span></button>`).join('')}</div></div></section>`;
  }
  /* что в доме: дом в разрезе с точками */
  const ZONES = [['top', 'Квартиры', 'home', /потол|шум|отделк|замк|touch/i, 42, 28], ['lobby', 'Вход и холл', 'door', /face|холл|лифт|видео/i, 43, 70], ['common', 'Для жителей', 'sofa', /кино|детск/i, 59, 69], ['yard', 'Двор', 'tree', /двор|площад/i, 71, 58], ['park', 'Паркинг', 'car', /паркинг/i, 47, 88]];
  function houseCut(f) {
    const B = ZK[f.b].benefits, PRI = ['lobby', 'common', 'yard', 'park', 'top'], zoneOf = b => PRI.find(k => ZONES.find(z => z[0] === k)[3].test(b));
    const Z = ZONES.map(([k, t, i, re, x, y]) => ({ k, t, i, x, y, L: B.filter(b => zoneOf(b) === k) })).filter(z => z.L.length);
    const rest = B.filter(b => !zoneOf(b));
    return `<section class="fx-sec hc"><h2>Что в доме</h2><p class="fx-sub">Нажмите на точку, чтобы посмотреть, что есть на каждом уровне дома.</p>
      <div class="hc-w"><div class="hc-pic"><img src="img/g/house-cut.webp" alt="Дом в разрезе" loading="lazy">${Z.map((z, n) => `<button type="button" class="hc-dot ${n ? '' : 'on'}" data-hz="${z.k}" style="left:${z.x}%;top:${z.y}%" aria-label="${z.t}"><i>${n + 1}</i></button>`).join('')}</div>
        <div class="hc-l">${Z.map((z, n) => `<div class="hc-z ${n ? '' : 'on'}" data-hz="${z.k}"><button type="button" class="hc-zh"><span class="hc-n num">${n + 1}</span>${icon(z.i)}<b>${z.t}</b><em class="num">${z.L.length}</em></button><ul>${z.L.map(b => `<li>${icon(benefitIcon(b))}${b}</li>`).join('')}</ul></div>`).join('')}
        ${rest.length ? `<div class="hc-more">${rest.map(b => `<span>${icon(benefitIcon(b))}${b}</span>`).join('')}</div>` : ''}</div></div></section>`;
  }
  function flatHTML(f, favOn) {
    const z = ZK[f.b], m = META[f.b], st = status(f.b), d = delta(f), fls = floorsOf(f), same = samePlan(f);
    const facts = [['ruler', 'Площадь', area(f.a) + ' м²'], ['door', 'Комнат', f.r], ['stairs', 'Этаж', f.fl + (fls ? ' из ' + fls : '')], ['building', 'Подъезд', f.e], ['key', 'Квартира', '№ ' + f.n], ['clock', 'Срок', st.t.replace('Сдача: ', '')], ['star', 'Класс', m.cls]];
    if (m.ceil) facts.push(['ceil', 'Потолки', m.ceil]);
    const sim = similar(f);
    return `
    <div class="fx">
      <div class="fx-top"><button class="fx-back" data-fx-back>${icon('back')}Все квартиры</button><span class="fx-crumb">Главная / ${z.name} / Квартира ${f.n}</span></div>
      <div class="fx-main">
        <div class="fx-view">
          <div class="fx-tabs" role="tablist"><button aria-selected="true" data-tab="plan">${icon('home')}Планировка</button><button data-tab="floor">${icon('layers')}На этаже</button><button data-tab="house">${icon('grid')}В подъезде</button>${m.pano ? `<a href="${m.pano}" target="_blank" rel="noopener">${icon('cube')}3D-тур</a>` : ''}</div>
          <div class="fx-pane on" data-pane="plan"><img src="${f.pl}" alt="Планировка ${roomsWord(f.r)}, ${area(f.a)} м²"></div>
          <div class="fx-pane" data-pane="floor">${floorPlan(f)}<p class="fx-note">${icon('info')}Схема этажа упрощена: показан порядок квартир в подъезде, без точной геометрии.</p></div>
          <div class="fx-pane" data-pane="house">${entranceGrid(f)}</div>
        </div>
        <div class="fx-side">
          <div class="fx-tags">${tags(f.b).map(t => `<span class="tg tg-${t.k}">${icon(t.i)}${t.t}</span>`).join('')}</div>
          <h1>${roomsWord(f.r)}, ${area(f.a)} м²</h1>
          <p class="fx-addr">${icon('pin')}${z.name} · ${z.addr} · ${z.area}</p>
          <div class="fx-price"><b class="num">${fmt(f.p)} ₸</b><span class="num">${fmt(f.m2)} ₸ за м²</span>
            ${d <= -1 ? `<em class="good">${icon('tag')}На ${-d}% дешевле средней цены за м² в ${SHORT[f.b]}</em>` : d >= 1 ? `<em>${icon('info')}Цена за м² выше средней по ${SHORT[f.b]} на ${d}%: высокий этаж или удачная планировка</em>` : `<em>${icon('info')}Средняя цена за м² по ${SHORT[f.b]}</em>`}</div>
          <div class="fx-month"><span>${icon('bank')}Ипотека</span><b class="num" data-fx-m>${fmt(monthly(f.p))} ₸/мес</b><button class="lnk" data-fx-calc>Изменить расчёт</button></div>
          <div class="fx-acts">
            <button class="kb pri" data-fx-book>${icon('key')}Забронировать</button>
            <button class="kb" data-fx-visit>${icon('cal')}Записаться на показ</button>
            <button class="kb" data-fx-family>${icon('users')}Обсудить с семьёй</button>
            <div class="fx-mini">
              <button class="kb ic" data-fx-fav aria-pressed="${!!favOn}" title="В избранное">${icon('heart')}</button>
              <button class="kb ic" data-fx-cmp aria-pressed="${cmp.has(f.id)}" title="Сравнить">${icon('compare')}</button>
              <button class="kb ic" data-fx-share title="Поделиться">${icon('share')}</button>
              <button class="kb ic" data-fx-pdf title="PDF-буклет">${icon('file')}</button>
            </div>
          </div>
          <div class="fx-mgr">${icon('phone')}<div><b>Отдел продаж</b><span>+7 700 800 00 16 · Пн–Сб 10–20, Вс 11–16</span></div><a class="kb sm" href="https://wa.me/77008000016?text=${encodeURIComponent(`Здравствуйте! Интересует ${roomsWord(f.r)} ${area(f.a)} м², кв. ${f.n} в ${z.name}`)}" target="_blank" rel="noopener">${icon('wa')}WhatsApp</a></div>
        </div>
      </div>
      <section class="fx-sec fx-two"><div class="fx-list"><h2>Главное о квартире</h2><dl class="fx-dl">${facts.map(([i, l, v]) => `<div>${icon(i)}<dt>${l}</dt><dd>${v}</dd></div>`).join('')}</dl>
        <div class="fx-hint">${icon('layers')}Такая планировка ${same > 1 ? `ещё в ${kv(same - 1)} этого ЖК, на разных этажах` : 'одна в продаже'}.</div></div>
        <div class="fx-nm"><h2>Что рядом с домом</h2>${nearMap(f.b)}</div></section>
      <section class="fx-sec" id="fxCalc"><h2>Сколько платить</h2><p class="fx-sub">Сравните три способа покупки: платёж, сумму сразу и выгоду.</p>${payCards(f)}</section>
      ${zkTabs(f)}
      ${houseCut(f)}
      ${sim.length ? `<section class="fx-sec"><h2>Похожие квартиры</h2><div class="fx-sim">${sim.map(x => `<a class="fx-s" data-flat="${x.id}" href="${R.url('flat.html#flat-' + x.id)}" style="text-decoration:none"><img src="${x.pl}" alt="" loading="lazy"><b>${roomsWord(x.r)}, ${area(x.a)} м²</b><span>${SHORT[x.b]} · ${x.fl} этаж</span><em class="num">${mln(x.p)} ₸</em></a>`).join('')}</div></section>` : ''}
    </div>`;
  }
  /* ---------- память посетителя: сравнение и просмотренные (только в этом браузере) ---------- */
  const store = (k, v) => { try { if (v === undefined) return JSON.parse(localStorage.getItem(k) || '[]'); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return []; } };
  const cmp = new Set(store('bq-cmp')), cmpL = new Set();
  function cmpToggle(id) { if (cmp.has(id)) cmp.delete(id); else { if (cmp.size >= 4) cmp.delete([...cmp][0]); cmp.add(id); } store('bq-cmp', [...cmp]); cmpL.forEach(fn => fn(cmp)); return cmp.has(id); }
  function seenAdd(id) { const a = store('bq-seen').filter(x => x !== id); a.unshift(id); store('bq-seen', a.slice(0, 8)); }
  const seen = () => store('bq-seen').map(id => FL.find(f => f.id === id)).filter(Boolean);
  function compare(onOpen) {
    const L = [...cmp].map(id => FL.find(f => f.id === id)).filter(Boolean);
    if (L.length < 2) { modal(`<div class="km-ic">${icon('compare')}</div><h3>Сравнение квартир</h3><p>Добавьте хотя бы две квартиры: кнопка ${icon('compare')} есть на карточке и на странице квартиры.</p><button class="kb pri" data-km-x>Понятно</button>`); return; }
    const best = (fn, dir) => { const v = L.map(fn); const b = dir > 0 ? Math.max(...v) : Math.min(...v); return v.map(x => x === b && v.some(y => y !== b)); };
    const R = [
      ['Цена', f => f.p, f => fmt(f.p) + ' ₸', -1], ['За м²', f => f.m2, f => fmt(f.m2) + ' ₸', -1], ['Платёж в месяц', f => monthly(f.p), f => fmt(monthly(f.p)) + ' ₸', -1],
      ['Площадь', f => f.a, f => area(f.a) + ' м²', 1], ['Комнат', f => f.r, f => f.r, 0], ['Этаж', f => f.fl, f => f.fl + (floorsOf(f) ? ' из ' + floorsOf(f) : ''), 0],
      ['Срок', f => 0, f => status(f.b).t.replace('Сдача: ', ''), 0], ['Класс', f => 0, f => META[f.b].cls, 0], ['Потолки', f => 0, f => META[f.b].ceil || '—', 0],
      ['Покупка', f => 0, f => ['full', ...META[f.b].pay].map(x => PAYN[x]).join(', '), 0], ['Цена к средней', f => delta(f), f => (delta(f) > 0 ? '+' : '') + delta(f) + '%', -1]];
    const m = modal(`<h3>${icon('compare')} Сравнение · ${L.length}</h3><p>Лучшее значение в строке подсвечено.</p>
      <div class="kcmp"><table><thead><tr><th></th>${L.map(f => `<th><button data-cmp-open="${f.id}"><img src="${f.pl}" alt=""><b>${SHORT[f.b]}</b><span>кв. ${f.n}</span></button><button class="kcmp-x" data-cmp-x="${f.id}" aria-label="Убрать">${icon('close')}</button></th>`).join('')}</tr></thead>
      <tbody>${R.map(([n, v, t, d]) => { const b = d ? best(v, d) : []; return `<tr><td>${n}</td>${L.map((f, i) => `<td class="${b[i] ? 'best' : ''}">${t(f)}</td>`).join('')}</tr>`; }).join('')}</tbody></table></div>`, 'wide xl');
    m.querySelector('.kcmp').onclick = e => { const o = e.target.closest('[data-cmp-open]'), x = e.target.closest('[data-cmp-x]'); if (x) { cmpToggle(+x.dataset.cmpX); compare(onOpen); } else if (o && onOpen) { closeModal(); onOpen(+o.dataset.cmpOpen); } };
  }
  /* шахматка всего ЖК: подъезды рядом, этажи сверху вниз */
  function chess(b, rf = 0) {
    const groups = [...new Set(FL.filter(f => f.b === b).map(f => f.q + '-' + f.e))].sort((x, y) => x.localeCompare(y, 'ru', { numeric: true }));
    return `<div class="kch">${groups.map(g => { const [q, e] = g.split('-').map(Number), L = FL.filter(f => f.b === b && f.q === q && f.e === e), k = SLOTS[b + '-' + e] || 4, top = floorsOf(L[0]) || Math.max(...L.map(f => f.fl));
      let h = ''; for (let fl = top; fl >= 2; fl--) { h += `<span class="kch-fl">${fl}</span>`; for (let s = 0; s < k; s++) { const x = L.find(y => y.fl === fl && y.s === s); h += x ? `<a class="kch-c r${Math.min(x.r, 4)} ${rf && Math.min(x.r, 4) !== rf ? 'dim' : ''}" data-flat="${x.id}" href="${R.url('flat.html#flat-' + x.id)}" style="text-decoration:none"><b>${x.r}к</b><span>${mln(x.p)}</span></a>` : '<i class="kch-c sold"></i>'; } }
      return `<div class="kch-e"><div class="kch-h">${META[b].queues ? q + ' очередь · ' : ''}Подъезд ${e}<span>${kv(L.length)}</span></div><div class="kch-g" style="--k:${k}">${h}</div></div>`; }).join('')}</div>`;
  }
  function alertForm(desc) {
    const m = modal(`<div class="km-ic">${icon('bell')}</div><h3>Сообщить о новых квартирах</h3><p>${desc ? `<b>${desc}</b><br>` : ''}Напишем, когда появятся подходящие квартиры, стартует новая очередь или снизится цена.</p>
      <div class="km-days km-ch">${['WhatsApp', 'Telegram', 'SMS'].map((x, i) => `<button type="button" aria-pressed="${!i}">${x}</button>`).join('')}</div>
      <form class="km-f" novalidate><input placeholder="+7 7__ ___ __ __" inputmode="tel" class="ph" aria-label="Телефон"><button class="kb pri" type="submit">${icon('bell')}Подписаться</button><small>В прототипе подписка не сохраняется.</small></form>`);
    phoneMask(m.querySelector('.ph'));
    m.querySelectorAll('.km-days button').forEach(b => b.onclick = () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
    m.querySelector('form').onsubmit = e => { e.preventDefault(); const ph = m.querySelector('.ph'); if (ph.value.replace(/\D/g, '').length !== 11) { ph.classList.add('bad'); return; } m.querySelector('form').outerHTML = '<p class="km-s">Готово (прототип): на сайте подписка сохранится и придёт первое сообщение.</p>'; };
  }
  const FAQ = [
    ['Можно купить без ипотеки, в рассрочку?', 'Да, в Alatau Plaza Residence есть рассрочка от застройщика, без банка. Срок и первый взнос рассчитывает менеджер под вашу квартиру.'],
    ['Подходят ли квартиры под ипотеку 7-20-25?', 'В Alatau Eco Park покупка по программе 7-20-25 указана в условиях. По остальным ЖК менеджер подберёт банк и программу.'],
    ['Когда сдача дома?', () => `Alatau Life: ${status('life').t.replace('Сдача:', 'срок сдачи')}. Alatau Plaza Residence: ${status('plaza').t.replace('Сдача:', 'срок сдачи')}. Alatau Eco Park: дом построен. Сроки на сайте обновляются сами.`],
    ['Как забронировать квартиру?', 'Нажмите «Забронировать» на квартире или позвоните. Менеджер подтвердит бронь и расскажет, какие документы нужны.'],
    ['Можно ли посмотреть квартиру вживую?', 'Да. Запишитесь на показ: покажем дом, двор и шоурум в отделе продаж на пр-те Мәңгілік Ел, 54.'],
    ['Есть ли паркинг и кладовые?', () => `Да: ${EX['Parking place'].n} машиномест и ${EX.Storeroom.n} кладовых в продаже. Их можно купить вместе с квартирой или отдельно.`],
    ['Какие документы у проектов?', 'Разрешение на строительство, проектная декларация и договор долевого участия. Копии менеджер покажет в офисе и пришлёт в кабинет.'],
    ['Можно выбирать квартиру вместе с семьёй?', 'Да. В личном кабинете добавьте близких по номеру: все видят избранное, голосуют и пишут комментарии.']
  ].map(([q, a]) => [q, typeof a === 'function' ? a() : a]);

  function mountFlat(root, f, api) {
    seenAdd(f.id);
    root.innerHTML = flatHTML(f, api.isFav(f.id));
    mountNear(root);
    const $ = s => root.querySelector(s), $$ = s => [...root.querySelectorAll(s)];
    $$('[data-tab]').forEach(b => b.onclick = () => { $$('[data-tab]').forEach(x => x.setAttribute('aria-selected', x === b)); $$('[data-pane]').forEach(p => p.classList.toggle('on', p.dataset.pane === b.dataset.tab)); });
    const setP = i => i.style.setProperty('--p', (i.value - i.min) / (i.max - i.min) * 100 + '%');
    /* ипотека: программа во вкладках */
    const mp = PROGS.filter(g => !g.full && g.u === 'y' && g.zk.includes(f.b)); let pg = mp[0];
    const rd = $('[data-r="md"]'), ry = $('[data-r="my"]');
    const setProg = g => { pg = g; rd.min = g.d[0]; rd.max = g.d[1]; rd.value = g.d[2]; ry.min = g.y[0]; ry.max = g.y[1]; ry.value = g.y[2]; $$('[data-pg]').forEach(b => b.setAttribute('aria-selected', b.dataset.pg === g.k)); mort(); };
    const mort = () => {
      const d = +rd.value, y = +ry.value, D = f.p * d / 100, L = f.p - D, M = annuity(L, y, pg.rate / 100);
      $('[data-o="mm"]').textContent = fmt(Math.round(M / 100) * 100) + ' ₸'; $('[data-o="mr"]').textContent = `ставка ${pg.rate}%${pg.fixed ? ', фиксированная' : pg.ex ? ', ориентировочно' : ''}`;
      $('[data-o="md"]').textContent = `${d}% · ${mln(D)} ₸`; $('[data-o="my"]').textContent = `${y} ${plural(y, 'год', 'года', 'лет')}`;
      $('[data-o="mn"]').textContent = pg.note; $('[data-fx-m]').textContent = fmt(Math.round(M / 100) * 100) + ' ₸/мес'; [rd, ry].forEach(setP);
    };
    rd.oninput = ry.oninput = mort; $$('[data-pg]').forEach(b => b.onclick = () => setProg(mp.find(g => g.k === b.dataset.pg))); setProg(pg);
    /* рассрочка */
    const ri = $('[data-r="id"]'), rm = $('[data-r="iy"]');
    const inst = () => { const D = f.p * ri.value / 100, M = (f.p - D) / rm.value; $('[data-o="im"]').textContent = fmt(Math.round(M / 1000) * 1000) + ' ₸'; $('[data-o="id"]').textContent = `${ri.value}% · ${mln(D)} ₸`; $('[data-o="iy"]').textContent = `${rm.value} мес.`; [ri, rm].forEach(setP); };
    if (ri) { ri.oninput = rm.oninput = inst; inst(); }
    /* полная оплата: скидка при 25, 50 или 100% */
    const full = i => { const [x, d] = FULLD[i], S = f.p * (1 - d / 100), now = S * x / 100;
      $$('[data-fd]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.fd === i));
      $('[data-o="fs"]').textContent = '−' + fmt(Math.round(f.p * d / 100 / 1000) * 1000) + ' ₸'; $('[data-o="fp"]').textContent = `скидка ${d}% при оплате ${x}%`;
      $('[data-o="fr"]').innerHTML = `<div><span>Цена со скидкой</span><b class="num">${fmt(Math.round(S / 1000) * 1000)} ₸</b></div><div><span>Вносите сейчас</span><b class="num">${fmt(Math.round(now / 1000) * 1000)} ₸</b></div><div><span>Остаток</span><b class="num">${x === 100 ? 'нет' : fmt(Math.round((S - now) / 1000) * 1000) + ' ₸'}</b></div>${x < 100 ? '<small>Остаток можно закрыть ипотекой или рассрочкой</small>' : ''}`; };
    if ($('[data-fd]')) { $$('[data-fd]').forEach(b => b.onclick = () => full(+b.dataset.fd)); full(2); }
    /* фото ЖК во вкладках */
    let zi = 0; const zt = i => { const n = $$('[data-zv]').length; zi = (i + n) % n; $$('[data-zt]').forEach(b => b.setAttribute('aria-selected', +b.dataset.zt === zi)); $$('[data-zv]').forEach(x => x.classList.toggle('on', +x.dataset.zv === zi)); };
    $$('[data-zt]').forEach(b => b.onclick = () => zt(+b.dataset.zt)); $$('[data-zn]').forEach(b => b.onclick = () => zt(zi + +b.dataset.zn));
    /* дом в разрезе */
    const hz = k => $$('.hc [data-hz]').forEach(x => x.classList.toggle('on', x.dataset.hz === k));
    $$('.hc [data-hz]').forEach(x => { const b = x.matches('button') ? x : $('.hc-zh', x) || x; b.addEventListener('click', () => hz(x.dataset.hz)); x.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover)').matches) hz(x.dataset.hz); }); });
    root.onclick = e => {
      const t = e.target;
      if (t.closest('[data-fx-back]')) return api.back();
      const fl = t.closest('[data-flat]');
      if (fl && +fl.dataset.flat !== f.id) { if (fl.href) { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); e.stopPropagation(); } return api.open(+fl.dataset.flat); }
      if (t.closest('[data-fx-calc]')) return $('#fxCalc').scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (t.closest('[data-fx-book]')) return api.form('book', f);
      if (t.closest('[data-fx-visit]')) return api.form('visit', f);
      if (t.closest('[data-fx-family]')) return api.family(f);
      if (t.closest('[data-fx-fav]')) { api.fav(f.id); $('[data-fx-fav]').setAttribute('aria-pressed', api.isFav(f.id)); return; }
      if (t.closest('[data-fx-cmp]')) { const on = cmpToggle(f.id); $('[data-fx-cmp]').setAttribute('aria-pressed', on); api.toast(on ? 'Добавили к сравнению' : 'Убрали из сравнения'); return; }
      if (t.closest('[data-fx-share]')) { const s = `${z(f)} — ${roomsWord(f.r)}, ${area(f.a)} м², ${mln(f.p)} ₸`; (navigator.clipboard ? navigator.clipboard.writeText(s) : Promise.reject()).then(() => api.toast('Описание квартиры скопировано'), () => api.toast(s)); return; }
      if (t.closest('[data-fx-pdf]')) return api.toast('На сайте здесь скачается PDF: планировка, цена, расчёт ипотеки. В прототипе это недоступно');
    };
    const z = x => ZK[x.b].name;
  }

  /* ---------- окна: заявка, семья, кабинет ---------- */
  function modal(html, cls = '') {
    let m = document.getElementById('kmodal');
    if (!m) { m = document.createElement('div'); m.id = 'kmodal'; m.className = 'km'; (document.getElementById('site') || document.body).appendChild(m); m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-km-x]')) closeModal(); }); }
    m.innerHTML = `<div class="km-box ${cls}" role="dialog" aria-modal="true"><button class="km-x" data-km-x aria-label="Закрыть">${icon('close')}</button>${html}</div>`;
    requestAnimationFrame(() => m.classList.add('on'));
    return m;
  }
  function closeModal() { const m = document.getElementById('kmodal'); if (m) m.classList.remove('on'); }
  // Телефон Казахстана: +7 и 10 цифр. Принимает любой набор: «701…», «8701…», «+7701…», «7701…».
  // Неполный номер — красная рамка и подсказка под полем (при уходе из поля и при отправке).
  function phoneMask(inp) {
    const nat = () => { const v = inp.value, own = /^\+7/.test(v.trim()); let d = v.replace(/\D/g, ''); if (own) d = d.slice(1); else if (d.length === 11 && /^[78]/.test(d)) d = d.slice(1); if (d.length > 10 && /^[78]/.test(d)) d = d.slice(1); return d.slice(0, 10); };
    const box = inp.closest('.l-in,.vis-in2') || inp;
    const msg = document.createElement('small'); msg.className = 'ph-err'; msg.setAttribute('aria-live', 'polite'); msg.id = 'pherr' + Math.random().toString(36).slice(2, 8);
    box.insertAdjacentElement('afterend', msg); inp.setAttribute('aria-describedby', msg.id);
    const show = on => { msg.textContent = on ? 'Введите номер полностью: 10 цифр после +7' : ''; inp.setAttribute('aria-invalid', on ? 'true' : 'false'); };
    inp.addEventListener('input', () => {
      const d = nat(); inp.value = d ? '+7 ' + [d.slice(0, 3), d.slice(3, 6), d.slice(6, 8), d.slice(8, 10)].filter(Boolean).join(' ') : '';
      if (d.length === 10 || !d) { inp.classList.remove('bad'); show(false); }
    });
    inp.addEventListener('blur', () => { const n = nat().length; if (n && n < 10) inp.classList.add('bad'); });
    // формы сами ставят .bad при отправке — подсказка появляется вместе с рамкой
    new MutationObserver(() => show(inp.classList.contains('bad'))).observe(inp, { attributes: true, attributeFilter: ['class'] });
  }
  function form(kind, f) {
    const T = { book: ['Бронирование квартиры', 'Менеджер позвонит, подтвердит бронь и расскажет, какие документы нужны.', 'key', 'Забронировать'], visit: ['Запись на показ', 'Покажем дом, двор и шоурум. Выберите удобный день.', 'cal', 'Записаться'], call: ['Заказать звонок', 'Перезвоним в рабочее время: Пн–Сб 10–20, Вс 11–16.', 'phone', 'Жду звонка'] }[kind];
    const days = kind === 'visit' ? (() => { const out = []; const d = new Date(); for (let i = 1; out.length < 5; i++) { const x = new Date(d.getTime() + i * 864e5); out.push(x); } return `<div class="km-days">${out.map((x, i) => `<button type="button" aria-pressed="${!i}">${['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][x.getDay()]}<b>${x.getDate()}</b></button>`).join('')}</div>`; })() : '';
    const m = modal(`<div class="km-ic">${icon(T[2])}</div><h3>${T[0]}</h3><p>${f ? `${ZK[f.b].name}, кв. ${f.n} · ${roomsWord(f.r)}, ${area(f.a)} м² · ${mln(f.p)} ₸<br>` : ''}${T[1]}</p>${days}
      <form class="km-f" novalidate><input placeholder="Имя" aria-label="Имя"><input placeholder="+7 7__ ___ __ __" inputmode="tel" aria-label="Телефон" class="ph"><button class="kb pri" type="submit">${icon(T[2])}${T[3]}</button><small>В прототипе заявка никуда не отправляется. На сайте она уйдёт в CRM.</small></form>`);
    phoneMask(m.querySelector('.ph'));
    m.querySelectorAll('.km-days button').forEach(b => b.onclick = () => m.querySelectorAll('.km-days button').forEach(x => x.setAttribute('aria-pressed', x === b)));
    m.querySelector('form').onsubmit = e => { e.preventDefault(); const ph = m.querySelector('.ph'); if (ph.value.replace(/\D/g, '').length !== 11) { ph.classList.add('bad'); ph.focus(); return; } m.querySelector('.km-box').innerHTML = `<button class="km-x" data-km-x aria-label="Закрыть">${icon('close')}</button><div class="km-ic ok">${icon('check')}</div><h3>Готово</h3><p>Это прототип: заявка не отправлена. На сайте менеджер получит её в CRM и свяжется с вами.</p><button class="kb pri" data-km-x>Хорошо</button>`; };
  }
  function family(f) {
    const link = `https://wa.me/?text=${encodeURIComponent(`Посмотри квартиру: ${ZK[f.b].name}, ${roomsWord(f.r)}, ${area(f.a)} м², ${f.fl} этаж, ${mln(f.p)} ₸. Голосуй в кабинете Baqyt!`)}`;
    modal(`<div class="km-ic">${icon('users')}</div><h3>Обсудите с семьёй</h3><p>Добавьте близких в кабинет: все видят одни и те же квартиры, ставят 👍 или 👎 и пишут комментарии.</p>
      <div class="km-fam"><div class="km-q"><img src="${f.pl}" alt=""><div><b>${roomsWord(f.r)}, ${area(f.a)} м²</b><span>${ZK[f.b].name} · ${mln(f.p)} ₸</span></div></div>
      <div class="km-votes"><span class="av">Вы</span><span class="av add">+</span><em>Пригласите, чтобы увидеть их голоса</em></div></div>
      <a class="kb pri" href="${link}" target="_blank" rel="noopener">${icon('wa')}Отправить в WhatsApp</a><button class="kb" data-km-cab>${icon('user')}Открыть семейный кабинет</button>
      <small class="km-s">Пример экрана. Голосование и чат работают в личном кабинете после входа.</small>`).querySelector('[data-km-cab]').onclick = () => cabinet();
  }
  function cabinet(favIds = []) {
    const fav = FL.filter(f => favIds.includes(f.id)).slice(0, 3);
    const m = modal(`<div class="km-ic">${icon('user')}</div><h3>Личный кабинет</h3><p>Вход по номеру телефона, без пароля: придёт код в SMS или WhatsApp.</p>
      <form class="km-f" novalidate><input placeholder="+7 7__ ___ __ __" inputmode="tel" class="ph" aria-label="Телефон"><button class="kb pri" type="submit">${icon('arrow')}Получить код</button></form>
      <div class="km-cab"><b>Что внутри</b>
        <div>${icon('heart')}<span>Избранное и сравнение${fav.length ? ` · сейчас ${fav.length}` : ''}</span></div>
        <div>${icon('users')}<span>Семья: голосование и чат по квартирам</span></div>
        <div>${icon('bell')}<span>Уведомления о снижении цены и новых квартирах</span></div>
        <div>${icon('key')}<span>Бронь, договор и график платежей</span></div>
        <div>${icon('building')}<span>Ход строительства вашего дома</span></div></div>`, 'wide');
    phoneMask(m.querySelector('.ph'));
    m.querySelector('form').onsubmit = e => { e.preventDefault(); const ph = m.querySelector('.ph'); if (ph.value.replace(/\D/g, '').length !== 11) { ph.classList.add('bad'); return; } m.querySelector('form').outerHTML = '<p class="km-s">Это прототип: код не отправляется. На сайте здесь откроется кабинет.</p>'; };
  }

  /* планировка во весь кадр: находим рисунок на картинке (без белых полей) и увеличиваем ровно до краёв рамки */
  function fitPlan(img) {
    const go = () => {
      const W = img.naturalWidth, H = img.naturalHeight, F = img.parentElement; if (!W || !F) return;
      const n = 120, c = document.createElement('canvas'), w = n, h = Math.round(n * H / W); c.width = w; c.height = h;
      const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, w, h);
      let d; try { d = x.getImageData(0, 0, w, h).data; } catch (e) { return; }
      let x0 = w, y0 = h, x1 = 0, y1 = 0;
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const k = (j * w + i) * 4; if (d[k + 3] > 20 && (d[k] < 236 || d[k + 1] < 236 || d[k + 2] < 236)) { if (i < x0) x0 = i; if (i > x1) x1 = i; if (j < y0) y0 = j; if (j > y1) y1 = j; } }
      if (x1 <= x0) return;
      const fw = F.clientWidth, fh = F.clientHeight, s = Math.min(fw / W, fh / H);
      const cw = (x1 - x0 + 1) / w * W * s, ch = (y1 - y0 + 1) / h * H * s;
      const z = Math.max(1, Math.min(fw * .9 / cw, fh * .9 / ch, 2.2));
      const dx = ((x0 + x1 + 1) / 2 / w - .5) * W * s, dy = ((y0 + y1 + 1) / 2 / h - .5) * H * s;
      img.style.transform = `translate(${-dx * z}px,${-dy * z}px) scale(${z})`;
    };
    img.complete ? go() : img.addEventListener('load', go, { once: true });
  }

  /* ---------- чат с ИИ-помощником ---------- */
  function chat(api) {
    let box = document.getElementById('kchat');
    if (!box) {
      box = document.createElement('div'); box.id = 'kchat'; box.className = 'kc';
      box.innerHTML = `<div class="kc-h">${icon('spark')}<div><b>Baqyt AI</b><span>Ищет по базе квартир, без выдумок</span></div><button class="kc-x" aria-label="Закрыть">${icon('close')}</button></div>
        <div class="kc-b"><div class="kc-hi"><h3>Какую квартиру ищете?</h3><p>Опишите словами</p></div><div class="kc-sug">${['Двушка до 30 млн', 'Рядом со школой для семьи', 'Когда сдача?', 'Есть рассрочка?', 'Сколько стоит паркинг?'].map(s => `<button>${s}${icon('arrow')}</button>`).join('')}</div></div>
        <form class="kc-f"><div class="kc-in"><input placeholder="Спросите о квартире" aria-label="Вопрос"><button class="kb pri ic" aria-label="Отправить">${icon('send')}</button></div></form>`;
      (document.getElementById('site') || document.body).appendChild(box);
      const body = box.querySelector('.kc-b'), inp = box.querySelector('input');
      const say = (txt) => {
        box.classList.add('go');
        body.insertAdjacentHTML('beforeend', `<div class="kc-m me">${txt.replace(/[<>&]/g, '')}</div><div class="kc-m bot typing"><i></i><i></i><i></i></div>`); body.scrollTop = body.scrollHeight;
        setTimeout(() => {
          const a = answer(txt), t = body.querySelector('.typing'); t.classList.remove('typing');
          t.innerHTML = a.text + (a.flats ? `<div class="kc-fl">${a.flats.map(f => `<button data-flat="${f.id}"><i class="kc-pic"><img src="${f.pl}" alt=""></i><span><b>${roomsWord(f.r)}, ${area(f.a)} м²</b>${SHORT[f.b]} · ${mln(f.p)} ₸</span></button>`).join('')}</div>${a.n > 3 ? `<button class="lnk" data-showall>Показать все ${a.n} в каталоге</button>` : ''}` : '');
          t.querySelectorAll('[data-flat]').forEach(b => b.onclick = () => api.open(+b.dataset.flat)); t.querySelectorAll('.kc-pic img').forEach(fitPlan);
          const sa = t.querySelector('[data-showall]'); if (sa) sa.onclick = () => { box.classList.remove('on'); api.apply(a.q); };
          body.scrollTop = body.scrollHeight;
        }, 650);
      };
      box.querySelector('form').onsubmit = e => { e.preventDefault(); if (inp.value.trim()) { say(inp.value.trim()); inp.value = ''; } };
      box.querySelector('.kc-sug').onclick = e => { const b = e.target.closest('button'); if (b) say(b.textContent); };
      box.querySelector('.kc-x').onclick = () => box.classList.remove('on');
    }
    box.classList.toggle('on'); if (box.classList.contains('on')) setTimeout(() => box.querySelector('input').focus({ preventScroll: true }), 300);
  }

  /* ипотека: программы (главная и страница ипотеки). Ставки, кроме 7-20-25, — примеры для расчёта */
  const PROGS = [
    { k: '7', i: 'percent', t: 'Ипотека 7-20-25', s: 'Госпрограмма для новостроек', rate: 7, fixed: 1, d: [20, 90, 20], y: [5, 25, 25], u: 'y', zk: ['eco'], note: 'Ставка 7% фиксирована на весь срок, взнос от 20%, срок до 25 лет. Подходит ли выбранная квартира, подтвердит банк.' },
    { k: 'market', i: 'bank', t: 'Ипотека банка', s: 'Любой ЖК, банки-партнёры', rate: 18, ex: 1, d: [20, 90, 20], y: [5, 25, 20], u: 'y', zk: ORDER, note: 'Ставка зависит от банка и вашего дохода. Поможем подать заявку сразу в несколько банков и выбрать лучшее предложение.' },
    { k: 'otbasy', i: 'wallet', t: 'Отбасы банк', s: 'Через жилищные накопления', rate: 5, ex: 1, d: [50, 90, 50], y: [5, 25, 15], u: 'y', zk: ORDER, note: 'Ставка ниже рыночной для тех, кто копил на депозите в Отбасы банке. Точные условия зависят от ваших накоплений.' },
    { k: 'freedom', i: 'bank', t: 'Накопительная ипотека Freedom', s: 'Взнос копится на депозите под 7%', ask: 1, bank: 1, zkq: 1, zk: ORDER,
      rl: '10,5–14,5%', dl: '30%, на депозит', yl: 'до 20 лет', note: 'Ставка зависит от срока накопления: чем дольше копите, тем ниже. После накопления ставка снижается до 10% годовых. Условия Freedom Bank от 08.04.2026.',
      tbl: [[80, '14,5%', '14,59%'], [94, '13,0%', '13,79%'], [106, '12,0%', '12,67%'], [116, '11,5%', '12,12%'], [125, '11,0%', '11,56%'], [132, '10,5%', '11,01%']] },
    { k: 'inst', i: 'calc', t: 'Рассрочка от застройщика', s: 'Без банка, в Alatau Plaza Residence', ask: 1, rate: 0, ex: 1, d: [30, 90, 30], y: [3, 24, 12], u: 'm', zk: ['plaza'], note: 'Платите застройщику частями без банка и переплаты. График под вашу квартиру составит менеджер.' },
    { k: 'full', i: 'key', t: 'Скидки за оплату', s: 'Размер скидки назовёт менеджер', full: 1, ask: 1, zk: ORDER }];
  const PIMG = { 7: 'prog-7-20-25', market: 'prog-market', otbasy: 'prog-otbasy', freedom: 'prog-market', inst: 'prog-installment', full: 'prog-full' };
  const PMORE = {
    7: ['Государственная программа для покупки квартиры в новостройке через банк-партнёр.', 'Ставка не меняется весь срок кредита, поэтому платёж известен заранее.', 'Требования к покупателю и предельную сумму кредита уточняет банк при подаче заявки.'],
    market: ['Обычная ипотека банка-партнёра: подходит для любого нашего ЖК и любой квартиры.', 'Ставка зависит от банка, взноса и срока. 18% на сайте — только пример для расчёта.', 'Менеджер поможет собрать документы и подать заявку сразу в несколько банков.'],
    otbasy: ['Для тех, кто копил на депозите в Отбасы банке: ставка ниже рыночной.', 'Размер взноса и ставка зависят от ваших накоплений и оценочного показателя.', '5% и взнос 50% на сайте — пример для расчёта.'],
    freedom: ['Первый взнос 30% не уходит застройщику сразу, а лежит на депозите в Freedom Bank под 7% годовых. Одновременно вы платите по ипотеке.', 'Когда срок накопления закончится, депозит сам погасит часть долга, а ставка снизится до 10% годовых. Платёж остаётся прежним, срок становится короче.', 'Снять депозит нельзя. Чтобы ставка снизилась, нужно накопить не меньше 50% суммы займа и выдержать срок накопления. Займ до 100 млн ₸, до 20 лет, без комиссий.'],
    inst: ['Платите застройщику частями, без банка, справок о доходе и переплаты банку.', 'Есть в Alatau Plaza Residence. Срок и взнос подбирает менеджер под конкретную квартиру.', 'Взнос, срок и график менеджер рассчитает под конкретную квартиру.'],
    full: ['Чем больше вносите сразу, тем больше скидка: она действует при оплате 25%, 50% или 100% стоимости.', 'Оставшуюся часть можно закрыть ипотекой или рассрочкой.', 'Размер скидки для каждого варианта называет менеджер: на сайте его пока нет.'] };
  const pFacts = g => g.bank ? [['percent', `Ставка ${g.rl}, потом 10%`], ['wallet', 'Взнос 30% — на депозит под 7%'], ['clock', `Срок ${g.yl}`]] : g.ask ? [['wallet', g.full ? 'Скидка за оплату сразу' : 'Без банка'], ['user', 'Условия рассчитает менеджер'], ['phone', 'Расчёт по звонку']] : g.full ? [['tag', 'Скидка при 25%'], ['tag', 'Скидка при 50%'], ['tag', 'Больше всего при 100%']] : [['percent', `Ставка ${g.rate}%${g.fixed ? ', фиксированная' : ''}`], ['wallet', `Взнос от ${g.d[0]}%`], ['clock', `Срок до ${g.y[1]} ${g.u === 'm' ? 'мес.' : 'лет'}`]];
  window.BQK = { GEO: { CATS, LM, hav, carMin }, nearMap, mountNear, PROGS, PIMG, PMORE, pFacts, cmp, cmpL, cmpToggle, compare, chess, seen, alertForm, FAQ, store, ORDER, SHORT, META, PAYN, ST, icon, ROOF, P, tags, status, delta, avgM2, samePlan, floorsOf, rName, kv, nearMin, NEARN, annuity, parse, match, answer, mountFlat, modal, closeModal, form, family, cabinet, chat, benefitIcon, placeIcon, phoneMask };
})();
