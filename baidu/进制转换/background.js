function randomRange(t, i) {
  return Math.random() * (i - t) + t;
}
function init() {
  (container = document.createElement("div")), document.body.appendChild(
    container
  ), (camera = new THREE.PerspectiveCamera(
    60,
    SCREEN_WIDTH / SCREEN_HEIGHT,
    1,
    1e4
  )), (camera.position.z = 1e3), (scene = new THREE.Scene()), scene.add(
    camera
  ), (renderer = new THREE.CanvasRenderer()), renderer.setSize(
    SCREEN_WIDTH,
    SCREEN_HEIGHT
  );
  for (
    var t = new THREE.ParticleBasicMaterial({
      map: new THREE.Texture(particleImage)
    }),
      i = 0;
    i < 500;
    i++
  )
    (particle = new Particle3D(t)), (particle.position.x =
      2e3 * Math.random() - 1e3), (particle.position.z =
      2e3 * Math.random() - 1e3), (particle.position.y =
      2e3 * Math.random() -
      1e3), (particle.scale.x = particle.scale.y = 1), scene.add(
      particle
    ), particles.push(particle);
  container.appendChild(renderer.domElement), document.addEventListener(
    "touchstart",
    onDocumentTouchStart,
    !1
  ), document.addEventListener(
    "touchmove",
    onDocumentTouchMove,
    !1
  ), document.addEventListener("touchend", onDocumentTouchEnd, !1), setInterval(
    loop,
    1e3 / 60
  );
}
function onDocumentTouchStart(t) {
  1 == t.touches.length &&
    ((touchStartX = 0), (touchStartX = t.touches[0].pageX));
}
function onDocumentTouchMove(t) {
  if (1 == t.touches.length) {
    var i = t.touches[0].pageX - touchStartX;
    Math.abs(i) > touchSensitive &&
      (i > 0 ? (touchFlag = 1) : i < 0 && (touchFlag = -1));
  }
}
function onDocumentTouchEnd(t) {
  t.changedTouches[0].pageX - touchStartX;
  changeAndBack(touchFlag);
}
function changeAndBack(t) {
  var i = 25 * t;
  t = 0;
  for (var e = 0; e < particles.length; e++)
    particles[e].velocity = new THREE.Vector3(i, -10, 0);
  var n = setTimeout(";", 800);
  clearTimeout(n);
  var r = setInterval(function() {
    if (t) return void clearInterval(r);
    (i *= 0.8), Math.abs(i) <= 1.5 && ((i = 0), clearInterval(r));
    for (var e = 0; e < particles.length; e++)
      particles[e].velocity = new THREE.Vector3(i, -10, 0);
  }, 100);
}
function loop() {
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    with ((particle.updatePhysics(), particle.position))
      y < -1e3 && starSnow && (y += 2e3), x > 1e3
        ? (x -= 2e3)
        : x < -1e3 && (x += 2e3), z > 1e3 ? (z -= 2e3) : z < -1e3 && (z += 2e3);
  }
  camera.lookAt(scene.position), renderer.render(scene, camera);
}
var THREE = THREE || {};
self.Int32Array ||
  (
    (self.Int32Array = Array),
    (self.Float32Array = Array)
  ), (THREE.Color = function(t) {
  return void 0 !== t && this.setHex(t), this;
}), (THREE.Color.prototype = {
  constructor: THREE.Color,
  r: 1,
  g: 1,
  b: 1,
  copy: function(t) {
    return (this.r = t.r), (this.g = t.g), (this.b = t.b), this;
  },
  copyGammaToLinear: function(t) {
    return (this.r = t.r * t.r), (this.g = t.g * t.g), (this.b =
      t.b * t.b), this;
  },
  copyLinearToGamma: function(t) {
    return (this.r = Math.sqrt(t.r)), (this.g = Math.sqrt(
      t.g
    )), (this.b = Math.sqrt(t.b)), this;
  },
  setRGB: function(t, i, e) {
    return (this.r = t), (this.g = i), (this.b = e), this;
  },
  setHSV: function(t, i, e) {
    var n, r, o;
    if (0 === e) this.r = this.g = this.b = 0;
    else
      switch ((
        (n = Math.floor(6 * t)),
        (r = 6 * t - n),
        (t = e * (1 - i)),
        (o = e * (1 - i * r)),
        (i = e * (1 - i * (1 - r))),
        n
      )) {
        case 1:
          (this.r = o), (this.g = e), (this.b = t);
          break;
        case 2:
          (this.r = t), (this.g = e), (this.b = i);
          break;
        case 3:
          (this.r = t), (this.g = o), (this.b = e);
          break;
        case 4:
          (this.r = i), (this.g = t), (this.b = e);
          break;
        case 5:
          (this.r = e), (this.g = t), (this.b = o);
          break;
        case 6:
        case 0:
          (this.r = e), (this.g = i), (this.b = t);
      }
    return this;
  },
  setHex: function(t) {
    return (t = Math.floor(t)), (this.r = ((t >> 16) & 255) / 255), (this.g =
      ((t >> 8) & 255) / 255), (this.b = (255 & t) / 255), this;
  },
  getHex: function() {
    return (
      (~~(255 * this.r) << 16) ^ (~~(255 * this.g) << 8) ^ ~~(255 * this.b)
    );
  },
  getContextStyle: function() {
    return (
      "rgb(" +
      Math.floor(255 * this.r) +
      "," +
      Math.floor(255 * this.g) +
      "," +
      Math.floor(255 * this.b) +
      ")"
    );
  },
  clone: function() {
    return new THREE.Color().setRGB(this.r, this.g, this.b);
  }
}), (THREE.Vector2 = function(t, i) {
  (this.x = t || 0), (this.y = i || 0);
}), (THREE.Vector2.prototype = {
  constructor: THREE.Vector2,
  set: function(t, i) {
    return (this.x = t), (this.y = i), this;
  },
  copy: function(t) {
    return (this.x = t.x), (this.y = t.y), this;
  },
  clone: function() {
    return new THREE.Vector2(this.x, this.y);
  },
  add: function(t, i) {
    return (this.x = t.x + i.x), (this.y = t.y + i.y), this;
  },
  addSelf: function(t) {
    return (this.x += t.x), (this.y += t.y), this;
  },
  sub: function(t, i) {
    return (this.x = t.x - i.x), (this.y = t.y - i.y), this;
  },
  subSelf: function(t) {
    return (this.x -= t.x), (this.y -= t.y), this;
  },
  multiplyScalar: function(t) {
    return (this.x *= t), (this.y *= t), this;
  },
  divideScalar: function(t) {
    return t ? ((this.x /= t), (this.y /= t)) : this.set(0, 0), this;
  },
  negate: function() {
    return this.multiplyScalar(-1);
  },
  dot: function(t) {
    return this.x * t.x + this.y * t.y;
  },
  lengthSq: function() {
    return this.x * this.x + this.y * this.y;
  },
  length: function() {
    return Math.sqrt(this.lengthSq());
  },
  normalize: function() {
    return this.divideScalar(this.length());
  },
  distanceTo: function(t) {
    return Math.sqrt(this.distanceToSquared(t));
  },
  distanceToSquared: function(t) {
    var i = this.x - t.x,
      t = this.y - t.y;
    return i * i + t * t;
  },
  setLength: function(t) {
    return this.normalize().multiplyScalar(t);
  },
  equals: function(t) {
    return t.x === this.x && t.y === this.y;
  }
}), (THREE.Vector3 = function(t, i, e) {
  (this.x = t || 0), (this.y = i || 0), (this.z = e || 0);
}), (THREE.Vector3.prototype = {
  constructor: THREE.Vector3,
  set: function(t, i, e) {
    return (this.x = t), (this.y = i), (this.z = e), this;
  },
  setX: function(t) {
    return (this.x = t), this;
  },
  setY: function(t) {
    return (this.y = t), this;
  },
  setZ: function(t) {
    return (this.z = t), this;
  },
  copy: function(t) {
    return (this.x = t.x), (this.y = t.y), (this.z = t.z), this;
  },
  clone: function() {
    return new THREE.Vector3(this.x, this.y, this.z);
  },
  add: function(t, i) {
    return (this.x = t.x + i.x), (this.y = t.y + i.y), (this.z =
      t.z + i.z), this;
  },
  addSelf: function(t) {
    return (this.x += t.x), (this.y += t.y), (this.z += t.z), this;
  },
  addScalar: function(t) {
    return (this.x += t), (this.y += t), (this.z += t), this;
  },
  sub: function(t, i) {
    return (this.x = t.x - i.x), (this.y = t.y - i.y), (this.z =
      t.z - i.z), this;
  },
  subSelf: function(t) {
    return (this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this;
  },
  multiply: function(t, i) {
    return (this.x = t.x * i.x), (this.y = t.y * i.y), (this.z =
      t.z * i.z), this;
  },
  multiplySelf: function(t) {
    return (this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this;
  },
  multiplyScalar: function(t) {
    return (this.x *= t), (this.y *= t), (this.z *= t), this;
  },
  divideSelf: function(t) {
    return (this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this;
  },
  divideScalar: function(t) {
    return t
      ? ((this.x /= t), (this.y /= t), (this.z /= t))
      : (this.z = this.y = this.x = 0), this;
  },
  negate: function() {
    return this.multiplyScalar(-1);
  },
  dot: function(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  },
  lengthSq: function() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  length: function() {
    return Math.sqrt(this.lengthSq());
  },
  lengthManhattan: function() {
    return this.x + this.y + this.z;
  },
  normalize: function() {
    return this.divideScalar(this.length());
  },
  setLength: function(t) {
    return this.normalize().multiplyScalar(t);
  },
  cross: function(t, i) {
    return (this.x = t.y * i.z - t.z * i.y), (this.y =
      t.z * i.x - t.x * i.z), (this.z = t.x * i.y - t.y * i.x), this;
  },
  crossSelf: function(t) {
    var i = this.x,
      e = this.y,
      n = this.z;
    return (this.x = e * t.z - n * t.y), (this.y = n * t.x - i * t.z), (this.z =
      i * t.y - e * t.x), this;
  },
  distanceTo: function(t) {
    return Math.sqrt(this.distanceToSquared(t));
  },
  distanceToSquared: function(t) {
    return new THREE.Vector3().sub(this, t).lengthSq();
  },
  setPositionFromMatrix: function(t) {
    (this.x = t.n14), (this.y = t.n24), (this.z = t.n34);
  },
  setRotationFromMatrix: function(t) {
    var i = Math.cos(this.y);
    (this.y = Math.asin(t.n13)), Math.abs(i) > 1e-5
      ? (
          (this.x = Math.atan2(-t.n23 / i, t.n33 / i)),
          (this.z = Math.atan2(-t.n12 / i, t.n11 / i))
        )
      : ((this.x = 0), (this.z = Math.atan2(t.n21, t.n22)));
  },
  isZero: function() {
    return this.lengthSq() < 1e-4;
  }
}), (THREE.Vector4 = function(t, i, e, n) {
  (this.x = t || 0), (this.y = i || 0), (this.z = e || 0), (this.w = void 0 !==
    n
    ? n
    : 1);
}), (THREE.Vector4.prototype = {
  constructor: THREE.Vector4,
  set: function(t, i, e, n) {
    return (this.x = t), (this.y = i), (this.z = e), (this.w = n), this;
  },
  copy: function(t) {
    (this.x = t.x), (this.y = t.y), (this.z = t.z), (this.w = void 0 !== t.w
      ? t.w
      : 1);
  },
  clone: function() {
    return new THREE.Vector4(this.x, this.y, this.z, this.w);
  },
  add: function(t, i) {
    return (this.x = t.x + i.x), (this.y = t.y + i.y), (this.z =
      t.z + i.z), (this.w = t.w + i.w), this;
  },
  addSelf: function(t) {
    return (this.x += t.x), (this.y += t.y), (this.z += t.z), (this.w +=
      t.w), this;
  },
  sub: function(t, i) {
    return (this.x = t.x - i.x), (this.y = t.y - i.y), (this.z =
      t.z - i.z), (this.w = t.w - i.w), this;
  },
  subSelf: function(t) {
    return (this.x -= t.x), (this.y -= t.y), (this.z -= t.z), (this.w -=
      t.w), this;
  },
  multiplyScalar: function(t) {
    return (this.x *= t), (this.y *= t), (this.z *= t), (this.w *= t), this;
  },
  divideScalar: function(t) {
    return t
      ? ((this.x /= t), (this.y /= t), (this.z /= t), (this.w /= t))
      : ((this.z = this.y = this.x = 0), (this.w = 1)), this;
  },
  negate: function() {
    return this.multiplyScalar(-1);
  },
  dot: function(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  },
  lengthSq: function() {
    return this.dot(this);
  },
  length: function() {
    return Math.sqrt(this.lengthSq());
  },
  normalize: function() {
    return this.divideScalar(this.length());
  },
  setLength: function(t) {
    return this.normalize().multiplyScalar(t);
  },
  lerpSelf: function(t, i) {
    return (this.x += (t.x - this.x) * i), (this.y +=
      (t.y - this.y) * i), (this.z += (t.z - this.z) * i), (this.w +=
      (t.w - this.w) * i), this;
  }
}), (THREE.Ray = function(t, i) {
  function e(t, i, e) {
    return H.sub(e, t), (E = H.dot(i)), E <= 0
      ? null
      : ((p = v.add(t, w.copy(i).multiplyScalar(E))), (u = e.distanceTo(p)));
  }
  function n(t, i, e, n) {
    return H.sub(n, i), v.sub(e, i), w.sub(t, i), (d = H.dot(H)), (f = H.dot(
      v
    )), (m = H.dot(w)), (R = v.dot(v)), (T = v.dot(w)), (y =
      1 / (d * R - f * f)), (g = (R * m - f * T) * y), (x =
      (d * T - f * m) * y), g >= 0 && x >= 0 && g + x < 1;
  }
  (this.origin = t || new THREE.Vector3()), (this.direction =
    i || new THREE.Vector3()), (this.intersectScene = function(t) {
    return this.intersectObjects(t.children);
  }), (this.intersectObjects = function(t) {
    var i,
      e,
      n = [];
    for (i = 0, e = t.length; i < e; i++)
      Array.prototype.push.apply(n, this.intersectObject(t[i]));
    return n.sort(function(t, i) {
      return t.distance - i.distance;
    }), n;
  });
  var r = new THREE.Vector3(),
    o = new THREE.Vector3(),
    s = new THREE.Vector3(),
    a = new THREE.Vector3(),
    t = new THREE.Vector3(),
    i = new THREE.Vector3(),
    h = new THREE.Vector3(),
    c = new THREE.Vector3(),
    l = new THREE.Vector3();
  this.intersectObject = function(E) {
    for (var p, u = [], d = 0, f = E.children.length; d < f; d++)
      Array.prototype.push.apply(u, this.intersectObject(E.children[d]));
    if (E instanceof THREE.Particle) {
      if (
        (
          (d = e(this.origin, this.direction, E.matrixWorld.getPosition())),
          null === d || d > E.scale.x
        )
      )
        return [];
      (p = { distance: d, point: E.position, face: null, object: E }), u.push(
        p
      );
    } else if (E instanceof THREE.Mesh) {
      if (
        (
          (d = e(this.origin, this.direction, E.matrixWorld.getPosition())),
          null === d ||
            d >
              E.geometry.boundingSphere.radius *
                Math.max(E.scale.x, Math.max(E.scale.y, E.scale.z))
        )
      )
        return u;
      var m,
        R,
        T = E.geometry,
        y = T.vertices;
      for (
        E.matrixRotationWorld.extractRotation(E.matrixWorld), d = 0, f =
          T.faces.length;
        d < f;
        d++
      )
        (p = T.faces[d]), t.copy(this.origin), i.copy(this.direction), (R =
          E.matrixWorld), (h = R.multiplyVector3(h.copy(p.centroid)).subSelf(
          t
        )), (m = h.dot(i)), m <= 0 ||
          (
            (r = R.multiplyVector3(r.copy(y[p.a].position))),
            (o = R.multiplyVector3(o.copy(y[p.b].position))),
            (s = R.multiplyVector3(s.copy(y[p.c].position))),
            p instanceof THREE.Face4 &&
              (a = R.multiplyVector3(a.copy(y[p.d].position))),
            (c = E.matrixRotationWorld.multiplyVector3(c.copy(p.normal))),
            (m = i.dot(c)),
            !E.doubleSided && !(E.flipSided ? m > 0 : m < 0)
          ) ||
          (
            (m = c.dot(h.sub(r, t)) / m),
            l.add(t, i.multiplyScalar(m)),
            p instanceof THREE.Face3
              ? n(l, r, o, s) &&
                  (
                    (p = {
                      distance: t.distanceTo(l),
                      point: l.clone(),
                      face: p,
                      object: E
                    }),
                    u.push(p)
                  )
              : p instanceof THREE.Face4 &&
                  (n(l, r, o, a) || n(l, o, s, a)) &&
                  (
                    (p = {
                      distance: t.distanceTo(l),
                      point: l.clone(),
                      face: p,
                      object: E
                    }),
                    u.push(p)
                  )
          );
    }
    return u;
  };
  var E,
    p,
    u,
    d,
    f,
    m,
    R,
    T,
    y,
    g,
    x,
    H = new THREE.Vector3(),
    v = new THREE.Vector3(),
    w = new THREE.Vector3();
}), (THREE.Rectangle = function() {
  function t() {
    (o = n - i), (s = r - e);
  }
  var i,
    e,
    n,
    r,
    o,
    s,
    a = !0;
  (this.getX = function() {
    return i;
  }), (this.getY = function() {
    return e;
  }), (this.getWidth = function() {
    return o;
  }), (this.getHeight = function() {
    return s;
  }), (this.getLeft = function() {
    return i;
  }), (this.getTop = function() {
    return e;
  }), (this.getRight = function() {
    return n;
  }), (this.getBottom = function() {
    return r;
  }), (this.set = function(o, s, h, c) {
    (a = !1), (i = o), (e = s), (n = h), (r = c), t();
  }), (this.addPoint = function(o, s) {
    a
      ? ((a = !1), (i = o), (e = s), (n = o), (r = s))
      : (
          (i = i < o ? i : o),
          (e = e < s ? e : s),
          (n = n > o ? n : o),
          (r = r > s ? r : s)
        ), t();
  }), (this.add3Points = function(o, s, h, c, l, E) {
    a
      ? (
          (a = !1),
          (i = o < h ? (o < l ? o : l) : h < l ? h : l),
          (e = s < c ? (s < E ? s : E) : c < E ? c : E),
          (n = o > h ? (o > l ? o : l) : h > l ? h : l),
          (r = s > c ? (s > E ? s : E) : c > E ? c : E)
        )
      : (
          (i = o < h
            ? o < l ? (o < i ? o : i) : l < i ? l : i
            : h < l ? (h < i ? h : i) : l < i ? l : i),
          (e = s < c
            ? s < E ? (s < e ? s : e) : E < e ? E : e
            : c < E ? (c < e ? c : e) : E < e ? E : e),
          (n = o > h
            ? o > l ? (o > n ? o : n) : l > n ? l : n
            : h > l ? (h > n ? h : n) : l > n ? l : n),
          (r = s > c
            ? s > E ? (s > r ? s : r) : E > r ? E : r
            : c > E ? (c > r ? c : r) : E > r ? E : r)
        ), t();
  }), (this.addRectangle = function(o) {
    a
      ? (
          (a = !1),
          (i = o.getLeft()),
          (e = o.getTop()),
          (n = o.getRight()),
          (r = o.getBottom())
        )
      : (
          (i = i < o.getLeft() ? i : o.getLeft()),
          (e = e < o.getTop() ? e : o.getTop()),
          (n = n > o.getRight() ? n : o.getRight()),
          (r = r > o.getBottom() ? r : o.getBottom())
        ), t();
  }), (this.inflate = function(o) {
    (i -= o), (e -= o), (n += o), (r += o), t();
  }), (this.minSelf = function(o) {
    (i = i > o.getLeft() ? i : o.getLeft()), (e = e > o.getTop()
      ? e
      : o.getTop()), (n = n < o.getRight() ? n : o.getRight()), (r = r <
      o.getBottom()
      ? r
      : o.getBottom()), t();
  }), (this.intersects = function(t) {
    return (
      Math.min(n, t.getRight()) - Math.max(i, t.getLeft()) >= 0 &&
      Math.min(r, t.getBottom()) - Math.max(e, t.getTop()) >= 0
    );
  }), (this.empty = function() {
    (a = !0), (r = n = e = i = 0), t();
  }), (this.isEmpty = function() {
    return a;
  });
}), (THREE.Math = {
  clamp: function(t, i, e) {
    return t < i ? i : t > e ? e : t;
  },
  clampBottom: function(t, i) {
    return t < i ? i : t;
  },
  mapLinear: function(t, i, e, n, r) {
    return n + (t - i) * (r - n) / (e - i);
  },
  random16: function() {
    return (65280 * Math.random() + 255 * Math.random()) / 65535;
  }
}), (THREE.Matrix3 = function() {
  this.m = [];
}), (THREE.Matrix3.prototype = {
  constructor: THREE.Matrix3,
  transpose: function() {
    var t,
      i = this.m;
    return (t = i[1]), (i[1] = i[3]), (i[3] = t), (t = i[2]), (i[2] =
      i[6]), (i[6] = t), (t = i[5]), (i[5] = i[7]), (i[7] = t), this;
  },
  transposeIntoArray: function(t) {
    var i = this.m;
    return (t[0] = i[0]), (t[1] = i[3]), (t[2] = i[6]), (t[3] = i[1]), (t[4] =
      i[4]), (t[5] = i[7]), (t[6] = i[2]), (t[7] = i[5]), (t[8] = i[8]), this;
  }
}), (THREE.Matrix4 = function(t, i, e, n, r, o, s, a, h, c, l, E, p, u, d, f) {
  this.set(
    void 0 !== t ? t : 1,
    i || 0,
    e || 0,
    n || 0,
    r || 0,
    void 0 !== o ? o : 1,
    s || 0,
    a || 0,
    h || 0,
    c || 0,
    void 0 !== l ? l : 1,
    E || 0,
    p || 0,
    u || 0,
    d || 0,
    void 0 !== f ? f : 1
  ), (this.flat = Array(16)), (this.m33 = new THREE.Matrix3());
}), (THREE.Matrix4.prototype = {
  constructor: THREE.Matrix4,
  set: function(t, i, e, n, r, o, s, a, h, c, l, E, p, u, d, f) {
    return (this.n11 = t), (this.n12 = i), (this.n13 = e), (this.n14 = n), (this.n21 = r), (this.n22 = o), (this.n23 = s), (this.n24 = a), (this.n31 = h), (this.n32 = c), (this.n33 = l), (this.n34 = E), (this.n41 = p), (this.n42 = u), (this.n43 = d), (this.n44 = f), this;
  },
  identity: function() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  },
  copy: function(t) {
    return this.set(
      t.n11,
      t.n12,
      t.n13,
      t.n14,
      t.n21,
      t.n22,
      t.n23,
      t.n24,
      t.n31,
      t.n32,
      t.n33,
      t.n34,
      t.n41,
      t.n42,
      t.n43,
      t.n44
    ), this;
  },
  lookAt: function(t, i, e) {
    var n = THREE.Matrix4.__v1,
      r = THREE.Matrix4.__v2,
      o = THREE.Matrix4.__v3;
    return o.sub(t, i).normalize(), 0 === o.length() && (o.z = 1), n
      .cross(e, o)
      .normalize(), 0 === n.length() &&
      ((o.x += 1e-4), n.cross(e, o).normalize()), r
      .cross(o, n)
      .normalize(), (this.n11 = n.x), (this.n12 = r.x), (this.n13 =
      o.x), (this.n21 = n.y), (this.n22 = r.y), (this.n23 = o.y), (this.n31 =
      n.z), (this.n32 = r.z), (this.n33 = o.z), this;
  },
  multiply: function(t, i) {
    var e = t.n11,
      n = t.n12,
      r = t.n13,
      o = t.n14,
      s = t.n21,
      a = t.n22,
      h = t.n23,
      c = t.n24,
      l = t.n31,
      E = t.n32,
      p = t.n33,
      u = t.n34,
      d = t.n41,
      f = t.n42,
      m = t.n43,
      R = t.n44,
      T = i.n11,
      y = i.n12,
      g = i.n13,
      x = i.n14,
      H = i.n21,
      v = i.n22,
      w = i.n23,
      M = i.n24,
      b = i.n31,
      S = i.n32,
      z = i.n33,
      V = i.n34,
      C = i.n41,
      L = i.n42,
      j = i.n43,
      W = i.n44;
    return (this.n11 = e * T + n * H + r * b + o * C), (this.n12 =
      e * y + n * v + r * S + o * L), (this.n13 =
      e * g + n * w + r * z + o * j), (this.n14 =
      e * x + n * M + r * V + o * W), (this.n21 =
      s * T + a * H + h * b + c * C), (this.n22 =
      s * y + a * v + h * S + c * L), (this.n23 =
      s * g + a * w + h * z + c * j), (this.n24 =
      s * x + a * M + h * V + c * W), (this.n31 =
      l * T + E * H + p * b + u * C), (this.n32 =
      l * y + E * v + p * S + u * L), (this.n33 =
      l * g + E * w + p * z + u * j), (this.n34 =
      l * x + E * M + p * V + u * W), (this.n41 =
      d * T + f * H + m * b + R * C), (this.n42 =
      d * y + f * v + m * S + R * L), (this.n43 =
      d * g + f * w + m * z + R * j), (this.n44 =
      d * x + f * M + m * V + R * W), this;
  },
  multiplySelf: function(t) {
    return this.multiply(this, t);
  },
  multiplyToArray: function(t, i, e) {
    return this.multiply(
      t,
      i
    ), (e[0] = this.n11), (e[1] = this.n21), (e[2] = this.n31), (e[3] = this.n41), (e[4] = this.n12), (e[5] = this.n22), (e[6] = this.n32), (e[7] = this.n42), (e[8] = this.n13), (e[9] = this.n23), (e[10] = this.n33), (e[11] = this.n43), (e[12] = this.n14), (e[13] = this.n24), (e[14] = this.n34), (e[15] = this.n44), this;
  },
  multiplyScalar: function(t) {
    return (this.n11 *= t), (this.n12 *= t), (this.n13 *= t), (this.n14 *= t), (this.n21 *= t), (this.n22 *= t), (this.n23 *= t), (this.n24 *= t), (this.n31 *= t), (this.n32 *= t), (this.n33 *= t), (this.n34 *= t), (this.n41 *= t), (this.n42 *= t), (this.n43 *= t), (this.n44 *= t), this;
  },
  multiplyVector3: function(t) {
    var i = t.x,
      e = t.y,
      n = t.z,
      r = 1 / (this.n41 * i + this.n42 * e + this.n43 * n + this.n44);
    return (t.x =
      (this.n11 * i + this.n12 * e + this.n13 * n + this.n14) * r), (t.y =
      (this.n21 * i + this.n22 * e + this.n23 * n + this.n24) * r), (t.z =
      (this.n31 * i + this.n32 * e + this.n33 * n + this.n34) * r), t;
  },
  multiplyVector4: function(t) {
    var i = t.x,
      e = t.y,
      n = t.z,
      r = t.w;
    return (t.x =
      this.n11 * i + this.n12 * e + this.n13 * n + this.n14 * r), (t.y =
      this.n21 * i + this.n22 * e + this.n23 * n + this.n24 * r), (t.z =
      this.n31 * i + this.n32 * e + this.n33 * n + this.n34 * r), (t.w =
      this.n41 * i + this.n42 * e + this.n43 * n + this.n44 * r), t;
  },
  rotateAxis: function(t) {
    var i = t.x,
      e = t.y,
      n = t.z;
    return (t.x = i * this.n11 + e * this.n12 + n * this.n13), (t.y =
      i * this.n21 + e * this.n22 + n * this.n23), (t.z =
      i * this.n31 + e * this.n32 + n * this.n33), t.normalize(), t;
  },
  crossVector: function(t) {
    var i = new THREE.Vector4();
    return (i.x =
      this.n11 * t.x + this.n12 * t.y + this.n13 * t.z + this.n14 * t.w), (i.y =
      this.n21 * t.x + this.n22 * t.y + this.n23 * t.z + this.n24 * t.w), (i.z =
      this.n31 * t.x +
      this.n32 * t.y +
      this.n33 * t.z +
      this.n34 * t.w), (i.w = t.w
      ? this.n41 * t.x + this.n42 * t.y + this.n43 * t.z + this.n44 * t.w
      : 1), i;
  },
  determinant: function() {
    var t = this.n11,
      i = this.n12,
      e = this.n13,
      n = this.n14,
      r = this.n21,
      o = this.n22,
      s = this.n23,
      a = this.n24,
      h = this.n31,
      c = this.n32,
      l = this.n33,
      E = this.n34,
      p = this.n41,
      u = this.n42,
      d = this.n43,
      f = this.n44;
    return (
      n * s * c * p -
      e * a * c * p -
      n * o * l * p +
      i * a * l * p +
      e * o * E * p -
      i * s * E * p -
      n * s * h * u +
      e * a * h * u +
      n * r * l * u -
      t * a * l * u -
      e * r * E * u +
      t * s * E * u +
      n * o * h * d -
      i * a * h * d -
      n * r * c * d +
      t * a * c * d +
      i * r * E * d -
      t * o * E * d -
      e * o * h * f +
      i * s * h * f +
      e * r * c * f -
      t * s * c * f -
      i * r * l * f +
      t * o * l * f
    );
  },
  transpose: function() {
    var t;
    return (t = this.n21), (this.n21 = this.n12), (this.n12 = t), (t = this
      .n31), (this.n31 = this.n13), (this.n13 = t), (t = this
      .n32), (this.n32 = this.n23), (this.n23 = t), (t = this
      .n41), (this.n41 = this.n14), (this.n14 = t), (t = this
      .n42), (this.n42 = this.n24), (this.n24 = t), (t = this
      .n43), (this.n43 = this.n34), (this.n43 = t), this;
  },
  clone: function() {
    var t = new THREE.Matrix4();
    return (t.n11 = this.n11), (t.n12 = this.n12), (t.n13 = this.n13), (t.n14 = this.n14), (t.n21 = this.n21), (t.n22 = this.n22), (t.n23 = this.n23), (t.n24 = this.n24), (t.n31 = this.n31), (t.n32 = this.n32), (t.n33 = this.n33), (t.n34 = this.n34), (t.n41 = this.n41), (t.n42 = this.n42), (t.n43 = this.n43), (t.n44 = this.n44), t;
  },
  flatten: function() {
    return (this.flat[0] = this.n11), (this.flat[1] = this.n21), (this.flat[2] = this.n31), (this.flat[3] = this.n41), (this.flat[4] = this.n12), (this.flat[5] = this.n22), (this.flat[6] = this.n32), (this.flat[7] = this.n42), (this.flat[8] = this.n13), (this.flat[9] = this.n23), (this.flat[10] = this.n33), (this.flat[11] = this.n43), (this.flat[12] = this.n14), (this.flat[13] = this.n24), (this.flat[14] = this.n34), (this.flat[15] = this.n44), this
      .flat;
  },
  flattenToArray: function(t) {
    return (t[0] = this.n11), (t[1] = this.n21), (t[2] = this.n31), (t[3] = this.n41), (t[4] = this.n12), (t[5] = this.n22), (t[6] = this.n32), (t[7] = this.n42), (t[8] = this.n13), (t[9] = this.n23), (t[10] = this.n33), (t[11] = this.n43), (t[12] = this.n14), (t[13] = this.n24), (t[14] = this.n34), (t[15] = this.n44), t;
  },
  flattenToArrayOffset: function(t, i) {
    return (t[i] = this.n11), (t[i + 1] = this.n21), (t[i + 2] = this.n31), (t[
      i + 3
    ] = this.n41), (t[i + 4] = this.n12), (t[i + 5] = this.n22), (t[
      i + 6
    ] = this.n32), (t[i + 7] = this.n42), (t[i + 8] = this.n13), (t[
      i + 9
    ] = this.n23), (t[i + 10] = this.n33), (t[i + 11] = this.n43), (t[
      i + 12
    ] = this.n14), (t[i + 13] = this.n24), (t[i + 14] = this.n34), (t[
      i + 15
    ] = this.n44), t;
  },
  setTranslation: function(t, i, e) {
    return this.set(1, 0, 0, t, 0, 1, 0, i, 0, 0, 1, e, 0, 0, 0, 1), this;
  },
  setScale: function(t, i, e) {
    return this.set(t, 0, 0, 0, 0, i, 0, 0, 0, 0, e, 0, 0, 0, 0, 1), this;
  },
  setRotationX: function(t) {
    var i = Math.cos(t),
      t = Math.sin(t);
    return this.set(1, 0, 0, 0, 0, i, -t, 0, 0, t, i, 0, 0, 0, 0, 1), this;
  },
  setRotationY: function(t) {
    var i = Math.cos(t),
      t = Math.sin(t);
    return this.set(i, 0, t, 0, 0, 1, 0, 0, -t, 0, i, 0, 0, 0, 0, 1), this;
  },
  setRotationZ: function(t) {
    var i = Math.cos(t),
      t = Math.sin(t);
    return this.set(i, -t, 0, 0, t, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  },
  setRotationAxis: function(t, i) {
    var e = Math.cos(i),
      n = Math.sin(i),
      r = 1 - e,
      o = t.x,
      s = t.y,
      a = t.z,
      h = r * o,
      c = r * s;
    return this.set(
      h * o + e,
      h * s - n * a,
      h * a + n * s,
      0,
      h * s + n * a,
      c * s + e,
      c * a - n * o,
      0,
      h * a - n * s,
      c * a + n * o,
      r * a * a + e,
      0,
      0,
      0,
      0,
      1
    ), this;
  },
  setPosition: function(t) {
    return (this.n14 = t.x), (this.n24 = t.y), (this.n34 = t.z), this;
  },
  getPosition: function() {
    return THREE.Matrix4.__v1.set(this.n14, this.n24, this.n34);
  },
  getColumnX: function() {
    return THREE.Matrix4.__v1.set(this.n11, this.n21, this.n31);
  },
  getColumnY: function() {
    return THREE.Matrix4.__v1.set(this.n12, this.n22, this.n32);
  },
  getColumnZ: function() {
    return THREE.Matrix4.__v1.set(this.n13, this.n23, this.n33);
  },
  getInverse: function(t) {
    var i = t.n11,
      e = t.n12,
      n = t.n13,
      r = t.n14,
      o = t.n21,
      s = t.n22,
      a = t.n23,
      h = t.n24,
      c = t.n31,
      l = t.n32,
      E = t.n33,
      p = t.n34,
      u = t.n41,
      d = t.n42,
      f = t.n43,
      m = t.n44;
    return (this.n11 =
      a * p * d -
      h * E * d +
      h * l * f -
      s * p * f -
      a * l * m +
      s * E * m), (this.n12 =
      r * E * d -
      n * p * d -
      r * l * f +
      e * p * f +
      n * l * m -
      e * E * m), (this.n13 =
      n * h * d -
      r * a * d +
      r * s * f -
      e * h * f -
      n * s * m +
      e * a * m), (this.n14 =
      r * a * l -
      n * h * l -
      r * s * E +
      e * h * E +
      n * s * p -
      e * a * p), (this.n21 =
      h * E * u -
      a * p * u -
      h * c * f +
      o * p * f +
      a * c * m -
      o * E * m), (this.n22 =
      n * p * u -
      r * E * u +
      r * c * f -
      i * p * f -
      n * c * m +
      i * E * m), (this.n23 =
      r * a * u -
      n * h * u -
      r * o * f +
      i * h * f +
      n * o * m -
      i * a * m), (this.n24 =
      n * h * c -
      r * a * c +
      r * o * E -
      i * h * E -
      n * o * p +
      i * a * p), (this.n31 =
      s * p * u -
      h * l * u +
      h * c * d -
      o * p * d -
      s * c * m +
      o * l * m), (this.n32 =
      r * l * u -
      e * p * u -
      r * c * d +
      i * p * d +
      e * c * m -
      i * l * m), (this.n33 =
      n * h * u -
      r * s * u +
      r * o * d -
      i * h * d -
      e * o * m +
      i * s * m), (this.n34 =
      r * s * c -
      e * h * c -
      r * o * l +
      i * h * l +
      e * o * p -
      i * s * p), (this.n41 =
      a * l * u -
      s * E * u -
      a * c * d +
      o * E * d +
      s * c * f -
      o * l * f), (this.n42 =
      e * E * u -
      n * l * u +
      n * c * d -
      i * E * d -
      e * c * f +
      i * l * f), (this.n43 =
      n * s * u -
      e * a * u -
      n * o * d +
      i * a * d +
      e * o * f -
      i * s * f), (this.n44 =
      e * a * c -
      n * s * c +
      n * o * l -
      i * a * l -
      e * o * E +
      i * s * E), this.multiplyScalar(1 / t.determinant()), this;
  },
  setRotationFromEuler: function(t, i) {
    var e = t.x,
      n = t.y,
      r = t.z,
      o = Math.cos(e),
      e = Math.sin(e),
      s = Math.cos(n),
      n = Math.sin(n),
      a = Math.cos(r),
      r = Math.sin(r);
    switch (i) {
      case "YXZ":
        var h = s * a,
          c = s * r,
          l = n * a,
          E = n * r;
        (this.n11 = h + E * e), (this.n12 = l * e - c), (this.n13 =
          o * n), (this.n21 = o * r), (this.n22 =
          o * a), (this.n23 = -e), (this.n31 = c * e - l), (this.n32 =
          E + h * e), (this.n33 = o * s);
        break;
      case "ZXY":
        (h = s * a), (c = s * r), (l = n * a), (E = n * r), (this.n11 =
          h - E * e), (this.n12 = -o * r), (this.n13 = l + c * e), (this.n21 =
          c + l * e), (this.n22 = o * a), (this.n23 = E - h * e), (this.n31 =
          -o * n), (this.n32 = e), (this.n33 = o * s);
        break;
      case "ZYX":
        (h = o * a), (c = o * r), (l = e * a), (E = e * r), (this.n11 =
          s * a), (this.n12 = l * n - c), (this.n13 = h * n + E), (this.n21 =
          s * r), (this.n22 = E * n + h), (this.n23 =
          c * n - l), (this.n31 = -n), (this.n32 = e * s), (this.n33 = o * s);
        break;
      case "YZX":
        (h = o * s), (c = o * n), (l = e * s), (E = e * n), (this.n11 =
          s * a), (this.n12 = E - h * r), (this.n13 =
          l * r + c), (this.n21 = r), (this.n22 = o * a), (this.n23 =
          -e * a), (this.n31 = -n * a), (this.n32 = c * r + l), (this.n33 =
          h - E * r);
        break;
      case "XZY":
        (h = o * s), (c = o * n), (l = e * s), (E = e * n), (this.n11 =
          s * a), (this.n12 = -r), (this.n13 = n * a), (this.n21 =
          h * r + E), (this.n22 = o * a), (this.n23 = c * r - l), (this.n31 =
          l * r - c), (this.n32 = e * a), (this.n33 = E * r + h);
        break;
      default:
        (h = o * a), (c = o * r), (l = e * a), (E = e * r), (this.n11 =
          s * a), (this.n12 = -s * r), (this.n13 = n), (this.n21 =
          c + l * n), (this.n22 = h - E * n), (this.n23 = -e * s), (this.n31 =
          E - h * n), (this.n32 = l + c * n), (this.n33 = o * s);
    }
    return this;
  },
  setRotationFromQuaternion: function(t) {
    var i = t.x,
      e = t.y,
      n = t.z,
      r = t.w,
      o = i + i,
      s = e + e,
      a = n + n,
      t = i * o,
      h = i * s;
    i *= a;
    var c = e * s;
    return (e *= a), (n *= a), (o *= r), (s *= r), (r *= a), (this.n11 =
      1 - (c + n)), (this.n12 = h - r), (this.n13 = i + s), (this.n21 =
      h + r), (this.n22 = 1 - (t + n)), (this.n23 = e - o), (this.n31 =
      i - s), (this.n32 = e + o), (this.n33 = 1 - (t + c)), this;
  },
  scale: function(t) {
    var i = t.x,
      e = t.y,
      t = t.z;
    return (this.n11 *= i), (this.n12 *= e), (this.n13 *= t), (this.n21 *= i), (this.n22 *= e), (this.n23 *= t), (this.n31 *= i), (this.n32 *= e), (this.n33 *= t), (this.n41 *= i), (this.n42 *= e), (this.n43 *= t), this;
  },
  compose: function(t, i, e) {
    var n = THREE.Matrix4.__m1,
      r = THREE.Matrix4.__m2;
    return n.identity(), n.setRotationFromQuaternion(i), r.setScale(
      e.x,
      e.y,
      e.z
    ), this.multiply(n, r), (this.n14 = t.x), (this.n24 = t.y), (this.n34 =
      t.z), this;
  },
  decompose: function(t, i, e) {
    var n = THREE.Matrix4.__v1,
      r = THREE.Matrix4.__v2,
      o = THREE.Matrix4.__v3;
    return n.set(this.n11, this.n21, this.n31), r.set(
      this.n12,
      this.n22,
      this.n32
    ), o.set(this.n13, this.n23, this.n33), (t = t instanceof THREE.Vector3
      ? t
      : new THREE.Vector3()), (i = i instanceof THREE.Quaternion
      ? i
      : new THREE.Quaternion()), (e = e instanceof THREE.Vector3
      ? e
      : new THREE.Vector3()), (e.x = n.length()), (e.y = r.length()), (e.z = o.length()), (t.x = this.n14), (t.y = this.n24), (t.z = this.n34), (n =
      THREE.Matrix4.__m1), n.copy(this), (n.n11 /= e.x), (n.n21 /=
      e.x), (n.n31 /= e.x), (n.n12 /= e.y), (n.n22 /= e.y), (n.n32 /=
      e.y), (n.n13 /= e.z), (n.n23 /= e.z), (n.n33 /=
      e.z), i.setFromRotationMatrix(n), [t, i, e];
  },
  extractPosition: function(t) {
    return (this.n14 = t.n14), (this.n24 = t.n24), (this.n34 = t.n34), this;
  },
  extractRotation: function(t) {
    var i = THREE.Matrix4.__v1,
      e = 1 / i.set(t.n11, t.n21, t.n31).length(),
      n = 1 / i.set(t.n12, t.n22, t.n32).length(),
      i = 1 / i.set(t.n13, t.n23, t.n33).length();
    return (this.n11 = t.n11 * e), (this.n21 = t.n21 * e), (this.n31 =
      t.n31 * e), (this.n12 = t.n12 * n), (this.n22 = t.n22 * n), (this.n32 =
      t.n32 * n), (this.n13 = t.n13 * i), (this.n23 = t.n23 * i), (this.n33 =
      t.n33 * i), this;
  }
}), (THREE.Matrix4.makeInvert3x3 = function(t) {
  var i = t.m33,
    e = i.m,
    n = t.n33 * t.n22 - t.n32 * t.n23,
    r = -t.n33 * t.n21 + t.n31 * t.n23,
    o = t.n32 * t.n21 - t.n31 * t.n22,
    s = -t.n33 * t.n12 + t.n32 * t.n13,
    a = t.n33 * t.n11 - t.n31 * t.n13,
    h = -t.n32 * t.n11 + t.n31 * t.n12,
    c = t.n23 * t.n12 - t.n22 * t.n13,
    l = -t.n23 * t.n11 + t.n21 * t.n13,
    E = t.n22 * t.n11 - t.n21 * t.n12,
    t = t.n11 * n + t.n21 * s + t.n31 * c;
  return (t = 1 / t), (e[0] = t * n), (e[1] = t * r), (e[2] = t * o), (e[3] =
    t * s), (e[4] = t * a), (e[5] = t * h), (e[6] = t * c), (e[7] =
    t * l), (e[8] = t * E), i;
}), (THREE.Matrix4.makeFrustum = function(t, i, e, n, r, o) {
  var s;
  return (s = new THREE.Matrix4()), (s.n11 =
    2 * r / (i - t)), (s.n12 = 0), (s.n13 =
    (i + t) / (i - t)), (s.n14 = 0), (s.n21 = 0), (s.n22 =
    2 * r / (n - e)), (s.n23 =
    (n + e) / (n - e)), (s.n24 = 0), (s.n31 = 0), (s.n32 = 0), (s.n33 =
    -(o + r) / (o - r)), (s.n34 =
    -2 *
    o *
    r /
    (o - r)), (s.n41 = 0), (s.n42 = 0), (s.n43 = -1), (s.n44 = 0), s;
}), (THREE.Matrix4.makePerspective = function(t, i, e, n) {
  var r,
    t = e * Math.tan(t * Math.PI / 360);
  return (r = -t), THREE.Matrix4.makeFrustum(r * i, t * i, r, t, e, n);
}), (THREE.Matrix4.makeOrtho = function(t, i, e, n, r, o) {
  var s, a, h, c;
  return (s = new THREE.Matrix4()), (a = i - t), (h = e - n), (c =
    o - r), (s.n11 = 2 / a), (s.n12 = 0), (s.n13 = 0), (s.n14 = -(
    (i + t) /
    a
  )), (s.n21 = 0), (s.n22 = 2 / h), (s.n23 = 0), (s.n24 = -(
    (e + n) /
    h
  )), (s.n31 = 0), (s.n32 = 0), (s.n33 = -2 / c), (s.n34 = -(
    (o + r) /
    c
  )), (s.n41 = 0), (s.n42 = 0), (s.n43 = 0), (s.n44 = 1), s;
}), (THREE.Matrix4.__v1 = new THREE.Vector3()), (THREE.Matrix4.__v2 = new THREE.Vector3()), (THREE.Matrix4.__v3 = new THREE.Vector3()), (THREE.Matrix4.__m1 = new THREE.Matrix4()), (THREE.Matrix4.__m2 = new THREE.Matrix4()), (THREE.Object3D = function() {
  (this.name =
    ""), (this.id = THREE.Object3DCount++), (this.parent = void 0), (this.children = []), (this.up = new THREE.Vector3(
    0,
    1,
    0
  )), (this.position = new THREE.Vector3()), (this.rotation = new THREE.Vector3()), (this.eulerOrder =
    "XYZ"), (this.scale = new THREE.Vector3(
    1,
    1,
    1
  )), (this.flipSided = this.doubleSided = this.dynamic = !1), (this.renderDepth = null), (this.rotationAutoUpdate = !0), (this.matrix = new THREE.Matrix4()), (this.matrixWorld = new THREE.Matrix4()), (this.matrixRotationWorld = new THREE.Matrix4()), (this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0), (this.quaternion = new THREE.Quaternion()), (this.useQuaternion = !1), (this.boundRadius = 0), (this.boundRadiusScale = 1), (this.visible = !0), (this.receiveShadow = this.castShadow = !1), (this.frustumCulled = !0), (this._vector = new THREE.Vector3());
}), (THREE.Object3D.prototype = {
  constructor: THREE.Object3D,
  translate: function(t, i) {
    this.matrix.rotateAxis(i), this.position.addSelf(i.multiplyScalar(t));
  },
  translateX: function(t) {
    this.translate(t, this._vector.set(1, 0, 0));
  },
  translateY: function(t) {
    this.translate(t, this._vector.set(0, 1, 0));
  },
  translateZ: function(t) {
    this.translate(t, this._vector.set(0, 0, 1));
  },
  lookAt: function(t) {
    this.matrix.lookAt(t, this.position, this.up), this.rotationAutoUpdate &&
      this.rotation.setRotationFromMatrix(this.matrix);
  },
  add: function(t) {
    if (this.children.indexOf(t) === -1) {
      void 0 !== t.parent &&
        t.parent.remove(t), (t.parent = this), this.children.push(t);
      for (var i = this; void 0 !== i.parent; ) i = i.parent;
      void 0 !== i && i instanceof THREE.Scene && i.addObject(t);
    }
  },
  remove: function(t) {
    var i = this.children.indexOf(t);
    if (i !== -1) {
      for (
        t.parent = void 0, this.children.splice(i, 1), i = this;
        void 0 !== i.parent;

      )
        i = i.parent;
      void 0 !== i && i instanceof THREE.Scene && i.removeObject(t);
    }
  },
  getChildByName: function(t, i) {
    var e, n, r;
    for (e = 0, n = this.children.length; e < n; e++) {
      if (((r = this.children[e]), r.name === t)) return r;
      if (i && ((r = r.getChildByName(t, i)), void 0 !== r)) return r;
    }
  },
  updateMatrix: function() {
    this.matrix.setPosition(this.position), this.useQuaternion
      ? this.matrix.setRotationFromQuaternion(this.quaternion)
      : this.matrix.setRotationFromEuler(this.rotation, this.eulerOrder), (1 ===
      this.scale.x &&
      1 === this.scale.y &&
      1 === this.scale.z) ||
      (
        this.matrix.scale(this.scale),
        (this.boundRadiusScale = Math.max(
          this.scale.x,
          Math.max(this.scale.y, this.scale.z)
        ))
      ), (this.matrixWorldNeedsUpdate = !0);
  },
  updateMatrixWorld: function(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this
      .matrixWorldNeedsUpdate ||
      t) &&
      (
        this.parent
          ? this.matrixWorld.multiply(this.parent.matrixWorld, this.matrix)
          : this.matrixWorld.copy(this.matrix),
        (this.matrixWorldNeedsUpdate = !1),
        (t = !0)
      );
    for (var i = 0, e = this.children.length; i < e; i++)
      this.children[i].updateMatrixWorld(t);
  }
}), (THREE.Object3DCount = 0), (THREE.Projector = function() {
  function t() {
    var t = (f[o] = f[o] || new THREE.RenderableObject());
    return o++, t;
  }
  function i() {
    var t = (m[a] = m[a] || new THREE.RenderableVertex());
    return a++, t;
  }
  function e(t, i) {
    return i.z - t.z;
  }
  function n(t, i) {
    var e = 0,
      n = 1,
      r = t.z + t.w,
      o = i.z + i.w,
      s = -t.z + t.w,
      a = -i.z + i.w;
    return (
      (r >= 0 && o >= 0 && s >= 0 && a >= 0) ||
      (!((r < 0 && o < 0) || (s < 0 && a < 0)) &&
        (
          r < 0
            ? (e = Math.max(e, r / (r - o)))
            : o < 0 && (n = Math.min(n, r / (r - o))),
          s < 0
            ? (e = Math.max(e, s / (s - a)))
            : a < 0 && (n = Math.min(n, s / (s - a))),
          !(n < e) && (t.lerpSelf(i, e), i.lerpSelf(t, 1 - n), !0)
        ))
    );
  }
  var r,
    o,
    s,
    a,
    h,
    c,
    l,
    E,
    p,
    u,
    d,
    f = [],
    m = [],
    R = [],
    T = [],
    y = [],
    g = [],
    x = { objects: [], sprites: [], lights: [], elements: [] },
    H = new THREE.Vector3(),
    v = new THREE.Vector4(),
    w = new THREE.Matrix4(),
    M = new THREE.Matrix4(),
    b = [
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4(),
      new THREE.Vector4()
    ],
    S = new THREE.Vector4(),
    z = new THREE.Vector4();
  (this.computeFrustum = function(t) {
    for (
      b[0].set(
        t.n41 - t.n11,
        t.n42 - t.n12,
        t.n43 - t.n13,
        t.n44 - t.n14
      ), b[1].set(
        t.n41 + t.n11,
        t.n42 + t.n12,
        t.n43 + t.n13,
        t.n44 + t.n14
      ), b[2].set(
        t.n41 + t.n21,
        t.n42 + t.n22,
        t.n43 + t.n23,
        t.n44 + t.n24
      ), b[3].set(
        t.n41 - t.n21,
        t.n42 - t.n22,
        t.n43 - t.n23,
        t.n44 - t.n24
      ), b[4].set(
        t.n41 - t.n31,
        t.n42 - t.n32,
        t.n43 - t.n33,
        t.n44 - t.n34
      ), b[5].set(
        t.n41 + t.n31,
        t.n42 + t.n32,
        t.n43 + t.n33,
        t.n44 + t.n34
      ), t = 0;
      t < 6;
      t++
    ) {
      var i = b[t];
      i.divideScalar(Math.sqrt(i.x * i.x + i.y * i.y + i.z * i.z));
    }
  }), (this.projectVector = function(t, i) {
    return i.matrixWorldInverse.getInverse(i.matrixWorld), w.multiply(
      i.projectionMatrix,
      i.matrixWorldInverse
    ), w.multiplyVector3(t), t;
  }), (this.unprojectVector = function(t, i) {
    return i.projectionMatrixInverse.getInverse(i.projectionMatrix), w.multiply(
      i.matrixWorld,
      i.projectionMatrixInverse
    ), w.multiplyVector3(t), t;
  }), (this.pickingRay = function(t, i) {
    var e;
    return (t.z = -1), (e = new THREE.Vector3(
      t.x,
      t.y,
      1
    )), this.unprojectVector(t, i), this.unprojectVector(e, i), e
      .subSelf(t)
      .normalize(), new THREE.Ray(t, e);
  }), (this.projectGraph = function(i, n) {
    (o = 0), (x.objects.length = 0), (x.sprites.length = 0), (x.lights.length = 0);
    var s = function(i) {
      if (i.visible !== !1) {
        var e;
        if (
          (e = i instanceof THREE.Mesh || i instanceof THREE.Line) &&
          !(e = i.frustumCulled === !1)
        )
          t: {
            for (
              var n = i.matrixWorld,
                o =
                  -i.geometry.boundingSphere.radius *
                  Math.max(i.scale.x, Math.max(i.scale.y, i.scale.z)),
                a = 0;
              a < 6;
              a++
            )
              if (
                (
                  (e =
                    b[a].x * n.n14 + b[a].y * n.n24 + b[a].z * n.n34 + b[a].w),
                  e <= o
                )
              ) {
                e = !1;
                break t;
              }
            e = !0;
          }
        for (
          e
            ? (
                w.multiplyVector3(H.copy(i.position)),
                (r = t()),
                (r.object = i),
                (r.z = H.z),
                x.objects.push(r)
              )
            : i instanceof THREE.Sprite || i instanceof THREE.Particle
              ? (
                  w.multiplyVector3(H.copy(i.position)),
                  (r = t()),
                  (r.object = i),
                  (r.z = H.z),
                  x.sprites.push(r)
                )
              : i instanceof THREE.Light && x.lights.push(i), e = 0, n =
            i.children.length;
          e < n;
          e++
        )
          s(i.children[e]);
      }
    };
    return s(i), n && x.objects.sort(e), x;
  }), (this.projectScene = function(t, r, o) {
    var f,
      H,
      b,
      V,
      C,
      L,
      j,
      W,
      P,
      B,
      A,
      O,
      _,
      F,
      N,
      D,
      I = r.near,
      k = r.far;
    for (
      d = p = l = c = 0, x.elements.length = 0, void 0 === r.parent &&
        t.add(r), t.updateMatrixWorld(), r.matrixWorldInverse.getInverse(
        r.matrixWorld
      ), w.multiply(
        r.projectionMatrix,
        r.matrixWorldInverse
      ), this.computeFrustum(w), x = this.projectGraph(t, !1), t = 0, f =
        x.objects.length;
      t < f;
      t++
    )
      if (
        (
          (P = x.objects[t].object),
          (B = P.matrixWorld),
          (O = P.material),
          (a = 0),
          P instanceof THREE.Mesh
        )
      ) {
        for (
          A = P.geometry, _ = P.geometry.materials, V = A.vertices, F =
            A.faces, N =
            A.faceVertexUvs, A = P.matrixRotationWorld.extractRotation(
            B
          ), H = 0, b = V.length;
          H < b;
          H++
        )
          (s = i()), s.positionWorld.copy(V[H].position), B.multiplyVector3(
            s.positionWorld
          ), s.positionScreen.copy(s.positionWorld), w.multiplyVector4(
            s.positionScreen
          ), (s.positionScreen.x /= s.positionScreen.w), (s.positionScreen.y /=
            s.positionScreen.w), (s.visible =
            s.positionScreen.z > I && s.positionScreen.z < k);
        for (V = 0, H = F.length; V < H; V++) {
          if (((b = F[V]), b instanceof THREE.Face3)) {
            if (
              (
                (C = m[b.a]),
                (L = m[b.b]),
                (j = m[b.c]),
                !(C.visible && L.visible && j.visible) ||
                  (!P.doubleSided &&
                    P.flipSided ==
                      (j.positionScreen.x - C.positionScreen.x) *
                        (L.positionScreen.y - C.positionScreen.y) -
                        (j.positionScreen.y - C.positionScreen.y) *
                          (L.positionScreen.x - C.positionScreen.x) <
                        0)
              )
            )
              continue;
            (W = R[c] =
              R[c] || new THREE.RenderableFace3()), c++, (h = W), h.v1.copy(
              C
            ), h.v2.copy(L), h.v3.copy(j);
          } else if (b instanceof THREE.Face4) {
            if (
              (
                (C = m[b.a]),
                (L = m[b.b]),
                (j = m[b.c]),
                (W = m[b.d]),
                !(C.visible && L.visible && j.visible && W.visible) ||
                  (!P.doubleSided &&
                    P.flipSided ==
                      ((W.positionScreen.x - C.positionScreen.x) *
                        (L.positionScreen.y - C.positionScreen.y) -
                        (W.positionScreen.y - C.positionScreen.y) *
                          (L.positionScreen.x - C.positionScreen.x) <
                        0 ||
                        (L.positionScreen.x - j.positionScreen.x) *
                          (W.positionScreen.y - j.positionScreen.y) -
                          (L.positionScreen.y - j.positionScreen.y) *
                            (W.positionScreen.x - j.positionScreen.x) <
                          0))
              )
            )
              continue;
            (D = T[l] =
              T[l] || new THREE.RenderableFace4()), l++, (h = D), h.v1.copy(
              C
            ), h.v2.copy(L), h.v3.copy(j), h.v4.copy(W);
          }
          for (
            h.normalWorld.copy(b.normal), A.multiplyVector3(
              h.normalWorld
            ), h.centroidWorld.copy(b.centroid), B.multiplyVector3(
              h.centroidWorld
            ), h.centroidScreen.copy(h.centroidWorld), w.multiplyVector3(
              h.centroidScreen
            ), j = b.vertexNormals, C = 0, L = j.length;
            C < L;
            C++
          )
            (W = h.vertexNormalsWorld[C]), W.copy(j[C]), A.multiplyVector3(W);
          for (C = 0, L = N.length; C < L; C++)
            if ((D = N[C][V]))
              for (j = 0, W = D.length; j < W; j++) h.uvs[C][j] = D[j];
          (h.material = O), (h.faceMaterial = null !== b.materialIndex
            ? _[b.materialIndex]
            : null), (h.z = h.centroidScreen.z), x.elements.push(h);
        }
      } else if (P instanceof THREE.Line)
        for (
          M.multiply(w, B), V =
            P.geometry.vertices, C = i(), C.positionScreen.copy(
            V[0].position
          ), M.multiplyVector4(C.positionScreen), H = 1, b = V.length;
          H < b;
          H++
        )
          (C = i()), C.positionScreen.copy(V[H].position), M.multiplyVector4(
            C.positionScreen
          ), (L = m[a - 2]), S.copy(C.positionScreen), z.copy(
            L.positionScreen
          ), n(S, z) &&
            (
              S.multiplyScalar(1 / S.w),
              z.multiplyScalar(1 / z.w),
              (P = y[p] = y[p] || new THREE.RenderableLine()),
              p++,
              (E = P),
              E.v1.positionScreen.copy(S),
              E.v2.positionScreen.copy(z),
              (E.z = Math.max(S.z, z.z)),
              (E.material = O),
              x.elements.push(E)
            );
    for (t = 0, f = x.sprites.length; t < f; t++)
      (P = x.sprites[t].object), (B = P.matrixWorld), P instanceof
        THREE.Particle &&
        (
          v.set(B.n14, B.n24, B.n34, 1),
          w.multiplyVector4(v),
          (v.z /= v.w),
          v.z > 0 && v.z < 1
        ) &&
        (
          (I = g[d] = g[d] || new THREE.RenderableParticle()),
          d++,
          (u = I),
          (u.x = v.x / v.w),
          (u.y = v.y / v.w),
          (u.z = v.z),
          (u.rotation = P.rotation.z),
          (u.scale.x =
            P.scale.x *
            Math.abs(
              u.x -
                (v.x + r.projectionMatrix.n11) / (v.w + r.projectionMatrix.n14)
            )),
          (u.scale.y =
            P.scale.y *
            Math.abs(
              u.y -
                (v.y + r.projectionMatrix.n22) / (v.w + r.projectionMatrix.n24)
            )),
          (u.material = P.material),
          x.elements.push(u)
        );
    return o && x.elements.sort(e), x;
  });
}), (THREE.Quaternion = function(t, i, e, n) {
  this.set(t || 0, i || 0, e || 0, void 0 !== n ? n : 1);
}), (THREE.Quaternion.prototype = {
  constructor: THREE.Quaternion,
  set: function(t, i, e, n) {
    return (this.x = t), (this.y = i), (this.z = e), (this.w = n), this;
  },
  copy: function(t) {
    return (this.x = t.x), (this.y = t.y), (this.z = t.z), (this.w = t.w), this;
  },
  setFromEuler: function(t) {
    var i = Math.PI / 360,
      e = t.x * i,
      n = t.y * i,
      r = t.z * i,
      t = Math.cos(n),
      n = Math.sin(n),
      i = Math.cos(-r),
      r = Math.sin(-r),
      o = Math.cos(e),
      e = Math.sin(e),
      s = t * i,
      a = n * r;
    return (this.w = s * o - a * e), (this.x = s * e + a * o), (this.y =
      n * i * o + t * r * e), (this.z = t * r * o - n * i * e), this;
  },
  setFromAxisAngle: function(t, i) {
    var e = i / 2,
      n = Math.sin(e);
    return (this.x = t.x * n), (this.y = t.y * n), (this.z =
      t.z * n), (this.w = Math.cos(e)), this;
  },
  setFromRotationMatrix: function(t) {
    var i = Math.pow(t.determinant(), 1 / 3);
    return (this.w =
      Math.sqrt(Math.max(0, i + t.n11 + t.n22 + t.n33)) / 2), (this.x =
      Math.sqrt(Math.max(0, i + t.n11 - t.n22 - t.n33)) / 2), (this.y =
      Math.sqrt(Math.max(0, i - t.n11 + t.n22 - t.n33)) / 2), (this.z =
      Math.sqrt(Math.max(0, i - t.n11 - t.n22 + t.n33)) / 2), (this.x = t.n32 -
      t.n23 <
      0
      ? -Math.abs(this.x)
      : Math.abs(this.x)), (this.y = t.n13 - t.n31 < 0
      ? -Math.abs(this.y)
      : Math.abs(this.y)), (this.z = t.n21 - t.n12 < 0
      ? -Math.abs(this.z)
      : Math.abs(this.z)), this.normalize(), this;
  },
  calculateW: function() {
    return (this.w = -Math.sqrt(
      Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z)
    )), this;
  },
  inverse: function() {
    return (this.x *= -1), (this.y *= -1), (this.z *= -1), this;
  },
  length: function() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  },
  normalize: function() {
    var t = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
    return 0 === t
      ? (this.w = this.z = this.y = this.x = 0)
      : (
          (t = 1 / t),
          (this.x *= t),
          (this.y *= t),
          (this.z *= t),
          (this.w *= t)
        ), this;
  },
  multiplySelf: function(t) {
    var i = this.x,
      e = this.y,
      n = this.z,
      r = this.w,
      o = t.x,
      s = t.y,
      a = t.z,
      t = t.w;
    return (this.x = i * t + r * o + e * a - n * s), (this.y =
      e * t + r * s + n * o - i * a), (this.z =
      n * t + r * a + i * s - e * o), (this.w =
      r * t - i * o - e * s - n * a), this;
  },
  multiply: function(t, i) {
    return (this.x = t.x * i.w + t.y * i.z - t.z * i.y + t.w * i.x), (this.y =
      -t.x * i.z + t.y * i.w + t.z * i.x + t.w * i.y), (this.z =
      t.x * i.y - t.y * i.x + t.z * i.w + t.w * i.z), (this.w =
      -t.x * i.x - t.y * i.y - t.z * i.z + t.w * i.w), this;
  },
  multiplyVector3: function(t, i) {
    i || (i = t);
    var e = t.x,
      n = t.y,
      r = t.z,
      o = this.x,
      s = this.y,
      a = this.z,
      h = this.w,
      c = h * e + s * r - a * n,
      l = h * n + a * e - o * r,
      E = h * r + o * n - s * e,
      e = -o * e - s * n - a * r;
    return (i.x = c * h + e * -o + l * -a - E * -s), (i.y =
      l * h + e * -s + E * -o - c * -a), (i.z =
      E * h + e * -a + c * -s - l * -o), i;
  }
}), (THREE.Quaternion.slerp = function(t, i, e, n) {
  var r = t.w * i.w + t.x * i.x + t.y * i.y + t.z * i.z;
  if (
    (
      r < 0
        ? ((e.w = -i.w), (e.x = -i.x), (e.y = -i.y), (e.z = -i.z), (r = -r))
        : e.copy(i),
      Math.abs(r) >= 1
    )
  )
    return (e.w = t.w), (e.x = t.x), (e.y = t.y), (e.z = t.z), e;
  var o = Math.acos(r),
    r = Math.sqrt(1 - r * r);
  return Math.abs(r) < 0.001
    ? (
        (e.w = 0.5 * (t.w + i.w)),
        (e.x = 0.5 * (t.x + i.x)),
        (e.y = 0.5 * (t.y + i.y)),
        (e.z = 0.5 * (t.z + i.z)),
        e
      )
    : (
        (i = Math.sin((1 - n) * o) / r),
        (n = Math.sin(n * o) / r),
        (e.w = t.w * i + e.w * n),
        (e.x = t.x * i + e.x * n),
        (e.y = t.y * i + e.y * n),
        (e.z = t.z * i + e.z * n),
        e
      );
}), (THREE.Vertex = function(t) {
  this.position = t || new THREE.Vector3();
}), (THREE.Face3 = function(t, i, e, n, r, o) {
  (this.a = t), (this.b = i), (this.c = e), (this.normal = n instanceof
    THREE.Vector3
    ? n
    : new THREE.Vector3()), (this.vertexNormals = n instanceof Array
    ? n
    : []), (this.color = r instanceof THREE.Color
    ? r
    : new THREE.Color()), (this.vertexColors = r instanceof Array
    ? r
    : []), (this.vertexTangents = []), (this.materialIndex = o), (this.centroid = new THREE.Vector3());
}), (THREE.Face4 = function(t, i, e, n, r, o, s) {
  (this.a = t), (this.b = i), (this.c = e), (this.d = n), (this.normal = r instanceof
    THREE.Vector3
    ? r
    : new THREE.Vector3()), (this.vertexNormals = r instanceof Array
    ? r
    : []), (this.color = o instanceof THREE.Color
    ? o
    : new THREE.Color()), (this.vertexColors = o instanceof Array
    ? o
    : []), (this.vertexTangents = []), (this.materialIndex = s), (this.centroid = new THREE.Vector3());
}), (THREE.UV = function(t, i) {
  (this.u = t || 0), (this.v = i || 0);
}), (THREE.UV.prototype = {
  constructor: THREE.UV,
  set: function(t, i) {
    return (this.u = t), (this.v = i), this;
  },
  copy: function(t) {
    return (this.u = t.u), (this.v = t.v), this;
  },
  clone: function() {
    return new THREE.UV(this.u, this.v);
  }
}), (THREE.Geometry = function() {
  (this.id = THREE.GeometryCount++), (this.vertices = []), (this.colors = []), (this.materials = []), (this.faces = []), (this.faceUvs = [
    []
  ]), (this.faceVertexUvs = [
    []
  ]), (this.morphTargets = []), (this.morphColors = []), (this.skinWeights = []), (this.skinIndices = []), (this.boundingSphere = this.boundingBox = null), (this.dynamic = this.hasTangents = !1);
}), (THREE.Geometry.prototype = {
  constructor: THREE.Geometry,
  applyMatrix: function(t) {
    var i = new THREE.Matrix4();
    i.extractRotation(t, new THREE.Vector3(1, 1, 1));
    for (var e = 0, n = this.vertices.length; e < n; e++)
      t.multiplyVector3(this.vertices[e].position);
    for (e = 0, n = this.faces.length; e < n; e++) {
      var r = this.faces[e];
      i.multiplyVector3(r.normal);
      for (var o = 0, s = r.vertexNormals.length; o < s; o++)
        i.multiplyVector3(r.vertexNormals[o]);
      t.multiplyVector3(r.centroid);
    }
  },
  computeCentroids: function() {
    var t, i, e;
    for (t = 0, i = this.faces.length; t < i; t++)
      (e = this.faces[t]), e.centroid.set(0, 0, 0), e instanceof THREE.Face3
        ? (
            e.centroid.addSelf(this.vertices[e.a].position),
            e.centroid.addSelf(this.vertices[e.b].position),
            e.centroid.addSelf(this.vertices[e.c].position),
            e.centroid.divideScalar(3)
          )
        : e instanceof THREE.Face4 &&
            (
              e.centroid.addSelf(this.vertices[e.a].position),
              e.centroid.addSelf(this.vertices[e.b].position),
              e.centroid.addSelf(this.vertices[e.c].position),
              e.centroid.addSelf(this.vertices[e.d].position),
              e.centroid.divideScalar(4)
            );
  },
  computeFaceNormals: function() {
    var t,
      i,
      e,
      n,
      r,
      o,
      s = new THREE.Vector3(),
      a = new THREE.Vector3();
    for (t = 0, i = this.faces.length; t < i; t++)
      (e = this.faces[t]), (n = this.vertices[e.a]), (r = this.vertices[
        e.b
      ]), (o = this.vertices[e.c]), s.sub(o.position, r.position), a.sub(
        n.position,
        r.position
      ), s.crossSelf(a), s.isZero() || s.normalize(), e.normal.copy(s);
  },
  computeVertexNormals: function() {
    var t, i, e, n;
    if (void 0 === this.__tmpVertices) {
      for (
        n = this.__tmpVertices = Array(this.vertices.length), t = 0, i = this
          .vertices.length;
        t < i;
        t++
      )
        n[t] = new THREE.Vector3();
      for (t = 0, i = this.faces.length; t < i; t++)
        (e = this.faces[t]), e instanceof THREE.Face3
          ? (e.vertexNormals = [
              new THREE.Vector3(),
              new THREE.Vector3(),
              new THREE.Vector3()
            ])
          : e instanceof THREE.Face4 &&
              (e.vertexNormals = [
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3()
              ]);
    } else
      for (n = this.__tmpVertices, t = 0, i = this.vertices.length; t < i; t++)
        n[t].set(0, 0, 0);
    for (t = 0, i = this.faces.length; t < i; t++)
      (e = this.faces[t]), e instanceof THREE.Face3
        ? (
            n[e.a].addSelf(e.normal),
            n[e.b].addSelf(e.normal),
            n[e.c].addSelf(e.normal)
          )
        : e instanceof THREE.Face4 &&
            (
              n[e.a].addSelf(e.normal),
              n[e.b].addSelf(e.normal),
              n[e.c].addSelf(e.normal),
              n[e.d].addSelf(e.normal)
            );
    for (t = 0, i = this.vertices.length; t < i; t++) n[t].normalize();
    for (t = 0, i = this.faces.length; t < i; t++)
      (e = this.faces[t]), e instanceof THREE.Face3
        ? (
            e.vertexNormals[0].copy(n[e.a]),
            e.vertexNormals[1].copy(n[e.b]),
            e.vertexNormals[2].copy(n[e.c])
          )
        : e instanceof THREE.Face4 &&
            (
              e.vertexNormals[0].copy(n[e.a]),
              e.vertexNormals[1].copy(n[e.b]),
              e.vertexNormals[2].copy(n[e.c]),
              e.vertexNormals[3].copy(n[e.d])
            );
  },
  computeTangents: function() {
    function t(t, i, e, n, r, o, w) {
      (a = t.vertices[i].position), (h = t.vertices[e].position), (c =
        t.vertices[n].position), (l = s[r]), (E = s[o]), (p = s[w]), (u =
        h.x - a.x), (d = c.x - a.x), (f = h.y - a.y), (m = c.y - a.y), (R =
        h.z - a.z), (T = c.z - a.z), (y = E.u - l.u), (g = p.u - l.u), (x =
        E.v - l.v), (H = p.v - l.v), (v = 1 / (y * H - g * x)), S.set(
        (H * u - x * d) * v,
        (H * f - x * m) * v,
        (H * R - x * T) * v
      ), z.set(
        (y * d - g * u) * v,
        (y * m - g * f) * v,
        (y * T - g * R) * v
      ), M[i].addSelf(S), M[e].addSelf(S), M[n].addSelf(S), b[i].addSelf(z), b[
        e
      ].addSelf(z), b[n].addSelf(z);
    }
    var i,
      e,
      n,
      r,
      o,
      s,
      a,
      h,
      c,
      l,
      E,
      p,
      u,
      d,
      f,
      m,
      R,
      T,
      y,
      g,
      x,
      H,
      v,
      w,
      M = [],
      b = [],
      S = new THREE.Vector3(),
      z = new THREE.Vector3(),
      V = new THREE.Vector3(),
      C = new THREE.Vector3(),
      L = new THREE.Vector3();
    for (i = 0, e = this.vertices.length; i < e; i++)
      (M[i] = new THREE.Vector3()), (b[i] = new THREE.Vector3());
    for (i = 0, e = this.faces.length; i < e; i++)
      (o = this.faces[i]), (s = this.faceVertexUvs[0][i]), o instanceof
        THREE.Face3
        ? t(this, o.a, o.b, o.c, 0, 1, 2)
        : o instanceof THREE.Face4 &&
            (t(this, o.a, o.b, o.c, 0, 1, 2), t(this, o.a, o.b, o.d, 0, 1, 3));
    var j = ["a", "b", "c", "d"];
    for (i = 0, e = this.faces.length; i < e; i++)
      for (o = this.faces[i], n = 0; n < o.vertexNormals.length; n++)
        L.copy(o.vertexNormals[n]), (r = o[j[n]]), (w = M[r]), V.copy(
          w
        ), V.subSelf(L.multiplyScalar(L.dot(w))).normalize(), C.cross(
          o.vertexNormals[n],
          w
        ), (r = C.dot(b[r])), (r = r < 0 ? -1 : 1), (o.vertexTangents[
          n
        ] = new THREE.Vector4(V.x, V.y, V.z, r));
    this.hasTangents = !0;
  },
  computeBoundingBox: function() {
    var t;
    if (this.vertices.length > 0) {
      this.boundingBox = {
        x: [this.vertices[0].position.x, this.vertices[0].position.x],
        y: [this.vertices[0].position.y, this.vertices[0].position.y],
        z: [this.vertices[0].position.z, this.vertices[0].position.z]
      };
      for (var i = 1, e = this.vertices.length; i < e; i++)
        (t = this.vertices[i]), t.position.x < this.boundingBox.x[0]
          ? (this.boundingBox.x[0] = t.position.x)
          : t.position.x > this.boundingBox.x[1] &&
              (this.boundingBox.x[1] = t.position.x), t.position.y <
          this.boundingBox.y[0]
          ? (this.boundingBox.y[0] = t.position.y)
          : t.position.y > this.boundingBox.y[1] &&
              (this.boundingBox.y[1] = t.position.y), t.position.z <
          this.boundingBox.z[0]
          ? (this.boundingBox.z[0] = t.position.z)
          : t.position.z > this.boundingBox.z[1] &&
              (this.boundingBox.z[1] = t.position.z);
    }
  },
  computeBoundingSphere: function() {
    for (var t = 0, i = 0, e = this.vertices.length; i < e; i++)
      t = Math.max(t, this.vertices[i].position.length());
    this.boundingSphere = { radius: t };
  },
  mergeVertices: function() {
    var t,
      i,
      e,
      n = {},
      r = [],
      o = [],
      s = Math.pow(10, 4);
    for (i = 0, e = this.vertices.length; i < e; i++)
      (t = this.vertices[i].position), (t = [
        Math.round(t.x * s),
        Math.round(t.y * s),
        Math.round(t.z * s)
      ].join("_")), void 0 === n[t]
        ? ((n[t] = i), r.push(this.vertices[i]), (o[i] = r.length - 1))
        : (o[i] = o[n[t]]);
    for (i = 0, e = this.faces.length; i < e; i++)
      (n = this.faces[i]), n instanceof THREE.Face3
        ? ((n.a = o[n.a]), (n.b = o[n.b]), (n.c = o[n.c]))
        : n instanceof THREE.Face4 &&
            ((n.a = o[n.a]), (n.b = o[n.b]), (n.c = o[n.c]), (n.d = o[n.d]));
    this.vertices = r;
  }
}), (THREE.GeometryCount = 0), (THREE.Camera = function() {
  return arguments.length
    ? new THREE.PerspectiveCamera(
        arguments[0],
        arguments[1],
        arguments[2],
        arguments[3]
      )
    : (
        THREE.Object3D.call(this),
        (this.matrixWorldInverse = new THREE.Matrix4()),
        (this.projectionMatrix = new THREE.Matrix4()),
        void (this.projectionMatrixInverse = new THREE.Matrix4())
      );
}), (THREE.Camera.prototype = new THREE.Object3D()), (THREE.Camera.prototype.constructor =
  THREE.Camera), (THREE.Camera.prototype.lookAt = function(t) {
  this.matrix.lookAt(this.position, t, this.up), this.rotationAutoUpdate &&
    this.rotation.setRotationFromMatrix(this.matrix);
}), (THREE.OrthographicCamera = function(t, i, e, n, r, o) {
  THREE.Camera.call(
    this
  ), (this.left = t), (this.right = i), (this.top = e), (this.bottom = n), (this.near = void 0 !==
    r
    ? r
    : 0.1), (this.far = void 0 !== o ? o : 2e3), this.updateProjectionMatrix();
}), (THREE.OrthographicCamera.prototype = new THREE.Camera()), (THREE.OrthographicCamera.prototype.constructor =
  THREE.OrthographicCamera), (THREE.OrthographicCamera.prototype.updateProjectionMatrix = function() {
  this.projectionMatrix = THREE.Matrix4.makeOrtho(
    this.left,
    this.right,
    this.top,
    this.bottom,
    this.near,
    this.far
  );
}), (THREE.PerspectiveCamera = function(t, i, e, n) {
  THREE.Camera.call(this), (this.fov = void 0 !== t
    ? t
    : 50), (this.aspect = void 0 !== i ? i : 1), (this.near = void 0 !== e
    ? e
    : 0.1), (this.far = void 0 !== n ? n : 2e3), this.updateProjectionMatrix();
}), (THREE.PerspectiveCamera.prototype = new THREE.Camera()), (THREE.PerspectiveCamera.prototype.constructor =
  THREE.PerspectiveCamera), (THREE.PerspectiveCamera.prototype.setLens = function(
  t,
  i
) {
  (this.fov = 2 * Math.atan((void 0 !== i ? i : 43.25) / (2 * t))), (this.fov *=
    180 / Math.PI), this.updateProjectionMatrix();
}), (THREE.PerspectiveCamera.prototype.setViewOffset = function(
  t,
  i,
  e,
  n,
  r,
  o
) {
  (this.fullWidth = t), (this.fullHeight = i), (this.x = e), (this.y = n), (this.width = r), (this.height = o), this.updateProjectionMatrix();
}), (THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
  if (this.fullWidth) {
    var t = this.fullWidth / this.fullHeight,
      i = Math.tan(this.fov * Math.PI / 360) * this.near,
      e = -i,
      n = t * e,
      t = Math.abs(t * i - n),
      e = Math.abs(i - e);
    this.projectionMatrix = THREE.Matrix4.makeFrustum(
      n + this.x * t / this.fullWidth,
      n + (this.x + this.width) * t / this.fullWidth,
      i - (this.y + this.height) * e / this.fullHeight,
      i - this.y * e / this.fullHeight,
      this.near,
      this.far
    );
  } else
    this.projectionMatrix = THREE.Matrix4.makePerspective(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );
}), (THREE.Light = function(t) {
  THREE.Object3D.call(this), (this.color = new THREE.Color(t));
}), (THREE.Light.prototype = new THREE.Object3D()), (THREE.Light.prototype.constructor =
  THREE.Light), (THREE.Light.prototype.supr =
  THREE.Object3D.prototype), (THREE.AmbientLight = function(t) {
  THREE.Light.call(this, t);
}), (THREE.AmbientLight.prototype = new THREE.Light()), (THREE.AmbientLight.prototype.constructor =
  THREE.AmbientLight), (THREE.DirectionalLight = function(t, i, e) {
  THREE.Light.call(this, t), (this.position = new THREE.Vector3(
    0,
    1,
    0
  )), (this.intensity = void 0 !== i ? i : 1), (this.distance = void 0 !== e
    ? e
    : 0);
}), (THREE.DirectionalLight.prototype = new THREE.Light()), (THREE.DirectionalLight.prototype.constructor =
  THREE.DirectionalLight), (THREE.PointLight = function(t, i, e) {
  THREE.Light.call(this, t), (this.position = new THREE.Vector3(
    0,
    0,
    0
  )), (this.intensity = void 0 !== i ? i : 1), (this.distance = void 0 !== e
    ? e
    : 0);
}), (THREE.PointLight.prototype = new THREE.Light()), (THREE.PointLight.prototype.constructor =
  THREE.PointLight), (THREE.Material = function(t) {
  (this.name = ""), (this.id = THREE.MaterialCount++), (t =
    t || {}), (this.opacity = void 0 !== t.opacity
    ? t.opacity
    : 1), (this.transparent =
    void 0 !== t.transparent && t.transparent), (this.blending = void 0 !==
    t.blending
    ? t.blending
    : THREE.NormalBlending), (this.depthTest =
    void 0 === t.depthTest || t.depthTest), (this.depthWrite =
    void 0 === t.depthWrite || t.depthWrite), (this.polygonOffset =
    void 0 !== t.polygonOffset &&
    t.polygonOffset), (this.polygonOffsetFactor = void 0 !==
    t.polygonOffsetFactor
    ? t.polygonOffsetFactor
    : 0), (this.polygonOffsetUnits = void 0 !== t.polygonOffsetUnits
    ? t.polygonOffsetUnits
    : 0), (this.alphaTest = void 0 !== t.alphaTest
    ? t.alphaTest
    : 0), (this.overdraw = void 0 !== t.overdraw && t.overdraw);
}), (THREE.MaterialCount = 0), (THREE.NoShading = 0), (THREE.FlatShading = 1), (THREE.SmoothShading = 2), (THREE.NoColors = 0), (THREE.FaceColors = 1), (THREE.VertexColors = 2), (THREE.NormalBlending = 0), (THREE.AdditiveBlending = 1), (THREE.SubtractiveBlending = 2), (THREE.MultiplyBlending = 3), (THREE.AdditiveAlphaBlending = 4), (THREE.LineBasicMaterial = function(
  t
) {
  THREE.Material.call(this, t), (t = t || {}), (this.color = void 0 !== t.color
    ? new THREE.Color(t.color)
    : new THREE.Color(16777215)), (this.linewidth = void 0 !== t.linewidth
    ? t.linewidth
    : 1), (this.linecap = void 0 !== t.linecap
    ? t.linecap
    : "round"), (this.linejoin = void 0 !== t.linejoin
    ? t.linejoin
    : "round"), (this.vertexColors =
    !!t.vertexColors && t.vertexColors), (this.fog = void 0 === t.fog || t.fog);
}), (THREE.LineBasicMaterial.prototype = new THREE.Material()), (THREE.LineBasicMaterial.prototype.constructor =
  THREE.LineBasicMaterial), (THREE.MeshBasicMaterial = function(t) {
  THREE.Material.call(this, t), (t = t || {}), (this.color = void 0 !== t.color
    ? new THREE.Color(t.color)
    : new THREE.Color(16777215)), (this.map = void 0 !== t.map
    ? t.map
    : null), (this.lightMap = void 0 !== t.lightMap
    ? t.lightMap
    : null), (this.envMap = void 0 !== t.envMap
    ? t.envMap
    : null), (this.combine = void 0 !== t.combine
    ? t.combine
    : THREE.MultiplyOperation), (this.reflectivity = void 0 !== t.reflectivity
    ? t.reflectivity
    : 1), (this.refractionRatio = void 0 !== t.refractionRatio
    ? t.refractionRatio
    : 0.98), (this.fog = void 0 === t.fog || t.fog), (this.shading = void 0 !==
    t.shading
    ? t.shading
    : THREE.SmoothShading), (this.wireframe =
    void 0 !== t.wireframe &&
    t.wireframe), (this.wireframeLinewidth = void 0 !== t.wireframeLinewidth
    ? t.wireframeLinewidth
    : 1), (this.wireframeLinecap = void 0 !== t.wireframeLinecap
    ? t.wireframeLinecap
    : "round"), (this.wireframeLinejoin = void 0 !== t.wireframeLinejoin
    ? t.wireframeLinejoin
    : "round"), (this.vertexColors =
    void 0 !== t.vertexColors && t.vertexColors), (this.skinning =
    void 0 !== t.skinning && t.skinning), (this.morphTargets =
    void 0 !== t.morphTargets && t.morphTargets);
}), (THREE.MeshBasicMaterial.prototype = new THREE.Material()), (THREE.MeshBasicMaterial.prototype.constructor =
  THREE.MeshBasicMaterial), (THREE.MeshLambertMaterial = function(t) {
  THREE.Material.call(this, t), (t = t || {}), (this.color = void 0 !== t.color
    ? new THREE.Color(t.color)
    : new THREE.Color(16777215)), (this.ambient = void 0 !== t.ambient
    ? new THREE.Color(t.ambient)
    : new THREE.Color(328965)), (this.map = void 0 !== t.map
    ? t.map
    : null), (this.lightMap = void 0 !== t.lightMap
    ? t.lightMap
    : null), (this.envMap = void 0 !== t.envMap
    ? t.envMap
    : null), (this.combine = void 0 !== t.combine
    ? t.combine
    : THREE.MultiplyOperation), (this.reflectivity = void 0 !== t.reflectivity
    ? t.reflectivity
    : 1), (this.refractionRatio = void 0 !== t.refractionRatio
    ? t.refractionRatio
    : 0.98), (this.fog = void 0 === t.fog || t.fog), (this.shading = void 0 !==
    t.shading
    ? t.shading
    : THREE.SmoothShading), (this.wireframe =
    void 0 !== t.wireframe &&
    t.wireframe), (this.wireframeLinewidth = void 0 !== t.wireframeLinewidth
    ? t.wireframeLinewidth
    : 1), (this.wireframeLinecap = void 0 !== t.wireframeLinecap
    ? t.wireframeLinecap
    : "round"), (this.wireframeLinejoin = void 0 !== t.wireframeLinejoin
    ? t.wireframeLinejoin
    : "round"), (this.vertexColors =
    void 0 !== t.vertexColors && t.vertexColors), (this.skinning =
    void 0 !== t.skinning && t.skinning), (this.morphTargets =
    void 0 !== t.morphTargets && t.morphTargets);
}), (THREE.MeshLambertMaterial.prototype = new THREE.Material()), (THREE.MeshLambertMaterial.prototype.constructor =
  THREE.MeshLambertMaterial), (THREE.MeshPhongMaterial = function(t) {
  THREE.Material.call(this, t), (t = t || {}), (this.color = void 0 !== t.color
    ? new THREE.Color(t.color)
    : new THREE.Color(16777215)), (this.ambient = void 0 !== t.ambient
    ? new THREE.Color(t.ambient)
    : new THREE.Color(328965)), (this.specular = void 0 !== t.specular
    ? new THREE.Color(t.specular)
    : new THREE.Color(1118481)), (this.shininess = void 0 !== t.shininess
    ? t.shininess
    : 30), (this.metal = void 0 !== t.metal && t.metal), (this.perPixel =
    void 0 !== t.perPixel && t.perPixel), (this.map = void 0 !== t.map
    ? t.map
    : null), (this.lightMap = void 0 !== t.lightMap
    ? t.lightMap
    : null), (this.envMap = void 0 !== t.envMap
    ? t.envMap
    : null), (this.combine = void 0 !== t.combine
    ? t.combine
    : THREE.MultiplyOperation), (this.reflectivity = void 0 !== t.reflectivity
    ? t.reflectivity
    : 1), (this.refractionRatio = void 0 !== t.refractionRatio
    ? t.refractionRatio
    : 0.98), (this.fog = void 0 === t.fog || t.fog), (this.shading = void 0 !==
    t.shading
    ? t.shading
    : THREE.SmoothShading), (this.wireframe =
    void 0 !== t.wireframe &&
    t.wireframe), (this.wireframeLinewidth = void 0 !== t.wireframeLinewidth
    ? t.wireframeLinewidth
    : 1), (this.wireframeLinecap = void 0 !== t.wireframeLinecap
    ? t.wireframeLinecap
    : "round"), (this.wireframeLinejoin = void 0 !== t.wireframeLinejoin
    ? t.wireframeLinejoin
    : "round"), (this.vertexColors =
    void 0 !== t.vertexColors && t.vertexColors), (this.skinning =
    void 0 !== t.skinning && t.skinning), (this.morphTargets =
    void 0 !== t.morphTargets && t.morphTargets);
}), (THREE.MeshPhongMaterial.prototype = new THREE.Material()), (THREE.MeshPhongMaterial.prototype.constructor =
  THREE.MeshPhongMaterial), (THREE.MeshDepthMaterial = function(t) {
  THREE.Material.call(this, t), (t = t || {}), (this.shading = void 0 !==
    t.shading
    ? t.shading
    : THREE.SmoothShading), (this.wireframe =
    void 0 !== t.wireframe &&
    t.wireframe), (this.wireframeLinewidth = void 0 !== t.wireframeLinewidth
    ? t.wireframeLinewidth
    : 1);
}), (THREE.MeshDepthMaterial.prototype = new THREE.Material()), (THREE.MeshDepthMaterial.prototype.constructor =
  THREE.MeshDepthMaterial), (THREE.MeshNormalMaterial = function(t) {
  THREE.Material.call(this, t), (t = t || {}), (this.shading = t.shading
    ? t.shading
    : THREE.FlatShading), (this.wireframe =
    !!t.wireframe &&
    t.wireframe), (this.wireframeLinewidth = t.wireframeLinewidth
    ? t.wireframeLinewidth
    : 1);
}), (THREE.MeshNormalMaterial.prototype = new THREE.Material()), (THREE.MeshNormalMaterial.prototype.constructor =
  THREE.MeshNormalMaterial), (THREE.MeshFaceMaterial = function() {}), (THREE.ParticleBasicMaterial = function(
  t
) {
  THREE.Material.call(this, t), (t = t || {}), (this.color = void 0 !== t.color
    ? new THREE.Color(t.color)
    : new THREE.Color(16777215)), (this.map = void 0 !== t.map
    ? t.map
    : null), (this.size = void 0 !== t.size
    ? t.size
    : 1), (this.sizeAttenuation =
    void 0 === t.sizeAttenuation || t.sizeAttenuation), (this.vertexColors =
    void 0 !== t.vertexColors && t.vertexColors), (this.fog =
    void 0 === t.fog || t.fog);
}), (THREE.ParticleBasicMaterial.prototype = new THREE.Material()), (THREE.ParticleBasicMaterial.prototype.constructor =
  THREE.ParticleBasicMaterial), (THREE.ParticleCanvasMaterial = function(t) {
  THREE.Material.call(this, t), (t = t || {}), (this.color = void 0 !== t.color
    ? new THREE.Color(t.color)
    : new THREE.Color(16777215)), (this.program = void 0 !== t.program
    ? t.program
    : function() {});
}), (THREE.ParticleCanvasMaterial.prototype = new THREE.Material()), (THREE.ParticleCanvasMaterial.prototype.constructor =
  THREE.ParticleCanvasMaterial), (THREE.Texture = function(t, i, e, n, r, o) {
  (this.id = THREE.TextureCount++), (this.image = t), (this.mapping = void 0 !==
    i
    ? i
    : new THREE.UVMapping()), (this.wrapS = void 0 !== e
    ? e
    : THREE.ClampToEdgeWrapping), (this.wrapT = void 0 !== n
    ? n
    : THREE.ClampToEdgeWrapping), (this.magFilter = void 0 !== r
    ? r
    : THREE.LinearFilter), (this.minFilter = void 0 !== o
    ? o
    : THREE.LinearMipMapLinearFilter), (this.offset = new THREE.Vector2(
    0,
    0
  )), (this.repeat = new THREE.Vector2(
    1,
    1
  )), (this.needsUpdate = !1), (this.onUpdate = null);
}), (THREE.Texture.prototype = {
  constructor: THREE.Texture,
  clone: function() {
    var t = new THREE.Texture(
      this.image,
      this.mapping,
      this.wrapS,
      this.wrapT,
      this.magFilter,
      this.minFilter
    );
    return t.offset.copy(this.offset), t.repeat.copy(this.repeat), t;
  }
}), (THREE.TextureCount = 0), (THREE.MultiplyOperation = 0), (THREE.MixOperation = 1), (THREE.CubeReflectionMapping = function() {}), (THREE.CubeRefractionMapping = function() {}), (THREE.LatitudeReflectionMapping = function() {}), (THREE.LatitudeRefractionMapping = function() {}), (THREE.SphericalReflectionMapping = function() {}), (THREE.SphericalRefractionMapping = function() {}), (THREE.UVMapping = function() {}), (THREE.RepeatWrapping = 0), (THREE.ClampToEdgeWrapping = 1), (THREE.MirroredRepeatWrapping = 2), (THREE.NearestFilter = 3), (THREE.NearestMipMapNearestFilter = 4), (THREE.NearestMipMapLinearFilter = 5), (THREE.LinearFilter = 6), (THREE.LinearMipMapNearestFilter = 7), (THREE.LinearMipMapLinearFilter = 8), (THREE.ByteType = 9), (THREE.UnsignedByteType = 10), (THREE.ShortType = 11), (THREE.UnsignedShortType = 12), (THREE.IntType = 13), (THREE.UnsignedIntType = 14), (THREE.FloatType = 15), (THREE.AlphaFormat = 16), (THREE.RGBFormat = 17), (THREE.RGBAFormat = 18), (THREE.LuminanceFormat = 19), (THREE.LuminanceAlphaFormat = 20), (THREE.Particle = function(
  t
) {
  THREE.Object3D.call(this), (this.material = t);
}), (THREE.Particle.prototype = new THREE.Object3D()), (THREE.Particle.prototype.constructor =
  THREE.Particle), (THREE.Line = function(t, i, e) {
  THREE.Object3D.call(
    this
  ), (this.geometry = t), (this.material = i), (this.type = void 0 !== e
    ? e
    : THREE.LineStrip), this.geometry &&
    (this.geometry.boundingSphere || this.geometry.computeBoundingSphere());
}), (THREE.LineStrip = 0), (THREE.LinePieces = 1), (THREE.Line.prototype = new THREE.Object3D()), (THREE.Line.prototype.constructor =
  THREE.Line), (THREE.Mesh = function(t, i) {
  if (
    (
      THREE.Object3D.call(this),
      (this.geometry = t),
      (this.material = i),
      i instanceof Array && (this.material = i[0]),
      this.geometry &&
        (
          this.geometry.boundingSphere || this.geometry.computeBoundingSphere(),
          (this.boundRadius = t.boundingSphere.radius),
          this.geometry.morphTargets.length
        )
    )
  ) {
    (this.morphTargetBase = -1), (this.morphTargetForcedOrder = []), (this.morphTargetInfluences = []), (this.morphTargetDictionary = {});
    for (var e = 0; e < this.geometry.morphTargets.length; e++)
      this.morphTargetInfluences.push(0), (this.morphTargetDictionary[
        this.geometry.morphTargets[e].name
      ] = e);
  }
}), (THREE.Mesh.prototype = new THREE.Object3D()), (THREE.Mesh.prototype.constructor =
  THREE.Mesh), (THREE.Mesh.prototype.supr =
  THREE.Object3D.prototype), (THREE.Mesh.prototype.getMorphTargetIndexByName = function(
  t
) {
  return void 0 !== this.morphTargetDictionary[t]
    ? this.morphTargetDictionary[t]
    : 0;
}), (THREE.Bone = function(t) {
  THREE.Object3D.call(
    this
  ), (this.skin = t), (this.skinMatrix = new THREE.Matrix4());
}), (THREE.Bone.prototype = new THREE.Object3D()), (THREE.Bone.prototype.constructor =
  THREE.Bone), (THREE.Bone.prototype.supr =
  THREE.Object3D.prototype), (THREE.Bone.prototype.update = function(t, i) {
  this.matrixAutoUpdate && (i |= this.updateMatrix()), (i ||
    this.matrixWorldNeedsUpdate) &&
    (
      t
        ? this.skinMatrix.multiply(t, this.matrix)
        : this.skinMatrix.copy(this.matrix),
      (this.matrixWorldNeedsUpdate = !1),
      (i = !0)
    );
  var e,
    n = this.children.length;
  for (e = 0; e < n; e++) this.children[e].update(this.skinMatrix, i);
}), (THREE.Sprite = function(t) {
  THREE.Object3D.call(this), (this.color = void 0 !== t.color
    ? new THREE.Color(t.color)
    : new THREE.Color(16777215)), (this.map = t.map instanceof THREE.Texture
    ? t.map
    : THREE.ImageUtils.loadTexture(t.map)), (this.blending = void 0 !==
    t.blending
    ? t.blending
    : THREE.NormalBlending), (this.useScreenCoordinates =
    void 0 === t.useScreenCoordinates ||
    t.useScreenCoordinates), (this.mergeWith3D = void 0 !== t.mergeWith3D
    ? t.mergeWith3D
    : !this.useScreenCoordinates), (this.affectedByDistance = void 0 !==
    t.affectedByDistance
    ? t.affectedByDistance
    : !this.useScreenCoordinates), (this.scaleByViewport = void 0 !==
    t.scaleByViewport
    ? t.scaleByViewport
    : !this.affectedByDistance), (this.alignment = t.alignment instanceof
    THREE.Vector2
    ? t.alignment
    : THREE.SpriteAlignment
        .center), (this.rotation3d = this.rotation), (this.rotation = 0), (this.opacity = 1), (this.uvOffset = new THREE.Vector2(
    0,
    0
  )), (this.uvScale = new THREE.Vector2(1, 1));
}), (THREE.Sprite.prototype = new THREE.Object3D()), (THREE.Sprite.prototype.constructor =
  THREE.Sprite), (THREE.Sprite.prototype.updateMatrix = function() {
  this.matrix.setPosition(this.position), this.rotation3d.set(
    0,
    0,
    this.rotation
  ), this.matrix.setRotationFromEuler(this.rotation3d), (1 === this.scale.x &&
    1 === this.scale.y) ||
    (
      this.matrix.scale(this.scale),
      (this.boundRadiusScale = Math.max(this.scale.x, this.scale.y))
    ), (this.matrixWorldNeedsUpdate = !0);
}), (THREE.SpriteAlignment = {}), (THREE.SpriteAlignment.topLeft = new THREE.Vector2(
  1,
  -1
)), (THREE.SpriteAlignment.topCenter = new THREE.Vector2(
  0,
  -1
)), (THREE.SpriteAlignment.topRight = new THREE.Vector2(
  -1,
  -1
)), (THREE.SpriteAlignment.centerLeft = new THREE.Vector2(
  1,
  0
)), (THREE.SpriteAlignment.center = new THREE.Vector2(
  0,
  0
)), (THREE.SpriteAlignment.centerRight = new THREE.Vector2(
  -1,
  0
)), (THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(
  1,
  1
)), (THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(
  0,
  1
)), (THREE.SpriteAlignment.bottomRight = new THREE.Vector2(
  -1,
  1
)), (THREE.Scene = function() {
  THREE.Object3D.call(
    this
  ), (this.overrideMaterial = this.fog = null), (this.matrixAutoUpdate = !1), (this.objects = []), (this.lights = []), (this.__objectsAdded = []), (this.__objectsRemoved = []);
}), (THREE.Scene.prototype = new THREE.Object3D()), (THREE.Scene.prototype.constructor =
  THREE.Scene), (THREE.Scene.prototype.addObject = function(t) {
  if (t instanceof THREE.Light)
    this.lights.indexOf(t) === -1 && this.lights.push(t);
  else if (
    !(t instanceof THREE.Camera || t instanceof THREE.Bone) &&
    this.objects.indexOf(t) === -1
  ) {
    this.objects.push(t), this.__objectsAdded.push(t);
    var i = this.__objectsRemoved.indexOf(t);
    i !== -1 && this.__objectsRemoved.splice(i, 1);
  }
  for (i = 0; i < t.children.length; i++) this.addObject(t.children[i]);
}), (THREE.Scene.prototype.removeObject = function(t) {
  if (t instanceof THREE.Light) {
    var i = this.lights.indexOf(t);
    i !== -1 && this.lights.splice(i, 1);
  } else
    t instanceof THREE.Camera ||
      (
        (i = this.objects.indexOf(t)),
        i !== -1 &&
          (
            this.objects.splice(i, 1),
            this.__objectsRemoved.push(t),
            (i = this.__objectsAdded.indexOf(t)),
            i !== -1 && this.__objectsAdded.splice(i, 1)
          )
      );
  for (i = 0; i < t.children.length; i++) this.removeObject(t.children[i]);
}), (THREE.CanvasRenderer = function(t) {
  function i(t) {
    Q != t && (X.globalAlpha = Q = t);
  }
  function e(t) {
    if (J != t) {
      switch (t) {
        case THREE.NormalBlending:
          X.globalCompositeOperation = "source-over";
          break;
        case THREE.AdditiveBlending:
          X.globalCompositeOperation = "lighter";
          break;
        case THREE.SubtractiveBlending:
          X.globalCompositeOperation = "darker";
      }
      J = t;
    }
  }
  function n(t) {
    K != t && (X.strokeStyle = K = t);
  }
  function r(t) {
    $ != t && (X.fillStyle = $ = t);
  }
  var o,
    s,
    a,
    h,
    c,
    l,
    E,
    p,
    u,
    d,
    f,
    m,
    R,
    T,
    y,
    g,
    x,
    H,
    v,
    w,
    M,
    b,
    S,
    z,
    V,
    C,
    L,
    j,
    W,
    P,
    B,
    A,
    O,
    _,
    F,
    N,
    D,
    I,
    k,
    U = this,
    q = new THREE.Projector(),
    t = t || {},
    Y = void 0 !== t.canvas ? t.canvas : document.createElement("canvas"),
    X = Y.getContext("2d"),
    G = new THREE.Color(0),
    Z = 0,
    Q = 1,
    J = 0,
    K = null,
    $ = null,
    tt = null,
    it = null,
    et = null,
    nt = new THREE.RenderableVertex(),
    rt = new THREE.RenderableVertex(),
    ot = new THREE.Color(),
    st = new THREE.Color(),
    at = new THREE.Color(),
    ht = new THREE.Color(),
    ct = new THREE.Color(),
    lt = [],
    Et = [],
    pt = new THREE.Rectangle(),
    ut = new THREE.Rectangle(),
    dt = new THREE.Rectangle(),
    ft = !1,
    mt = new THREE.Color(),
    Rt = new THREE.Color(),
    Tt = new THREE.Color(),
    yt = new THREE.Vector3(),
    t = 16;
  (_ = document.createElement(
    "canvas"
  )), (_.width = _.height = 2), (F = _.getContext("2d")), (F.fillStyle =
    "rgba(0,0,0,1)"), F.fillRect(0, 0, 2, 2), (N = F.getImageData(
    0,
    0,
    2,
    2
  )), (D = N.data), (I = document.createElement(
    "canvas"
  )), (I.width = I.height = t), (k = I.getContext("2d")), k.translate(
    -t / 2,
    -t / 2
  ), k.scale(
    t,
    t
  ), t--, (this.domElement = Y), (this.sortElements = this.sortObjects = this.autoClear = !0), (this.info = {
    render: { vertices: 0, faces: 0 }
  }), (this.setSize = function(t, i) {
    (h = t), (c = i), (l = Math.floor(h / 2)), (E = Math.floor(
      c / 2
    )), (Y.width = h), (Y.height = c), pt.set(-l, -E, l, E), ut.set(
      -l,
      -E,
      l,
      E
    ), (Q = 1), (J = 0), (et = it = tt = $ = K = null);
  }), (this.setClearColor = function(t, i) {
    G.copy(t), (Z = i), ut.set(-l, -E, l, E);
  }), (this.setClearColorHex = function(t, i) {
    G.setHex(t), (Z = i), ut.set(-l, -E, l, E);
  }), (this.clear = function() {
    X.setTransform(1, 0, 0, -1, l, E), ut.isEmpty() ||
      (
        ut.minSelf(pt),
        ut.inflate(2),
        Z < 1 &&
          X.clearRect(
            Math.floor(ut.getX()),
            Math.floor(ut.getY()),
            Math.floor(ut.getWidth()),
            Math.floor(ut.getHeight())
          ),
        Z > 0 &&
          (
            e(THREE.NormalBlending),
            i(1),
            r(
              "rgba(" +
                Math.floor(255 * G.r) +
                "," +
                Math.floor(255 * G.g) +
                "," +
                Math.floor(255 * G.b) +
                "," +
                Z +
                ")"
            ),
            X.fillRect(
              Math.floor(ut.getX()),
              Math.floor(ut.getY()),
              Math.floor(ut.getWidth()),
              Math.floor(ut.getHeight())
            )
          ),
        ut.empty()
      );
  }), (this.render = function(t, h) {
    function c(t) {
      var i, e, n, r;
      for (
        mt.setRGB(0, 0, 0), Rt.setRGB(0, 0, 0), Tt.setRGB(0, 0, 0), i = 0, e =
          t.length;
        i < e;
        i++
      )
        (n = t[i]), (r = n.color), n instanceof THREE.AmbientLight
          ? ((mt.r += r.r), (mt.g += r.g), (mt.b += r.b))
          : n instanceof THREE.DirectionalLight
            ? ((Rt.r += r.r), (Rt.g += r.g), (Rt.b += r.b))
            : n instanceof THREE.PointLight &&
                ((Tt.r += r.r), (Tt.g += r.g), (Tt.b += r.b));
    }
    function Y(t, i, e, n) {
      var r, o, s, a, h, c;
      for (r = 0, o = t.length; r < o; r++)
        (s = t[r]), (a = s.color), s instanceof THREE.DirectionalLight
          ? (
              (h = s.matrixWorld.getPosition()),
              (c = e.dot(h)),
              c <= 0 ||
                (
                  (c *= s.intensity),
                  (n.r += a.r * c),
                  (n.g += a.g * c),
                  (n.b += a.b * c)
                )
            )
          : s instanceof THREE.PointLight &&
              (
                (h = s.matrixWorld.getPosition()),
                (c = e.dot(yt.sub(h, i).normalize())),
                c <= 0 ||
                  (
                    (c *= 0 == s.distance
                      ? 1
                      : 1 - Math.min(i.distanceTo(h) / s.distance, 1)),
                    0 != c &&
                      (
                        (c *= s.intensity),
                        (n.r += a.r * c),
                        (n.g += a.g * c),
                        (n.b += a.b * c)
                      )
                  )
              );
    }
    function G(t, o, s) {
      i(s.opacity), e(s.blending);
      var a, h, c, p, u, d;
      s instanceof THREE.ParticleBasicMaterial
        ? s.map &&
            (
              (p = s.map.image),
              (u = p.width >> 1),
              (d = p.height >> 1),
              (s = o.scale.x * l),
              (c = o.scale.y * E),
              (a = s * u),
              (h = c * d),
              dt.set(t.x - a, t.y - h, t.x + a, t.y + h),
              pt.intersects(dt) &&
                (
                  X.save(),
                  X.translate(t.x, t.y),
                  X.rotate(-o.rotation),
                  X.scale(s, -c),
                  X.translate(-u, -d),
                  X.drawImage(p, 0, 0),
                  X.restore()
                )
            )
        : s instanceof THREE.ParticleCanvasMaterial &&
            (
              (a = o.scale.x * l),
              (h = o.scale.y * E),
              dt.set(t.x - a, t.y - h, t.x + a, t.y + h),
              pt.intersects(dt) &&
                (
                  n(s.color.getContextStyle()),
                  r(s.color.getContextStyle()),
                  X.save(),
                  X.translate(t.x, t.y),
                  X.rotate(-o.rotation),
                  X.scale(a, h),
                  s.program(X),
                  X.restore()
                )
            );
    }
    function Z(t, r, o, s) {
      i(s.opacity), e(s.blending), X.beginPath(), X.moveTo(
        t.positionScreen.x,
        t.positionScreen.y
      ), X.lineTo(
        r.positionScreen.x,
        r.positionScreen.y
      ), X.closePath(), s instanceof THREE.LineBasicMaterial &&
        (
          (t = s.linewidth),
          tt != t && (X.lineWidth = tt = t),
          (t = s.linecap),
          it != t && (X.lineCap = it = t),
          (t = s.linejoin),
          et != t && (X.lineJoin = et = t),
          n(s.color.getContextStyle()),
          X.stroke(),
          dt.inflate(2 * s.linewidth)
        );
    }
    function Q(t, n, r, o, s, c, l, E) {
      (U.info.render.vertices += 3), U.info.render.faces++, i(E.opacity), e(
        E.blending
      ), (m = t.positionScreen.x), (R = t.positionScreen.y), (T =
        n.positionScreen.x), (y = n.positionScreen.y), (g =
        r.positionScreen.x), (x = r.positionScreen.y), K(
        m,
        R,
        T,
        y,
        g,
        x
      ), E instanceof THREE.MeshBasicMaterial
        ? E.map
          ? E.map.mapping instanceof THREE.UVMapping &&
              (
                (L = l.uvs[0]),
                Ht(
                  m,
                  R,
                  T,
                  y,
                  g,
                  x,
                  L[o].u,
                  L[o].v,
                  L[s].u,
                  L[s].v,
                  L[c].u,
                  L[c].v,
                  E.map
                )
              )
          : E.envMap
            ? E.envMap.mapping instanceof THREE.SphericalReflectionMapping &&
                (
                  (t = h.matrixWorldInverse),
                  yt.copy(l.vertexNormalsWorld[o]),
                  (j =
                    0.5 * (yt.x * t.n11 + yt.y * t.n12 + yt.z * t.n13) + 0.5),
                  (W =
                    0.5 * -(yt.x * t.n21 + yt.y * t.n22 + yt.z * t.n23) + 0.5),
                  yt.copy(l.vertexNormalsWorld[s]),
                  (P =
                    0.5 * (yt.x * t.n11 + yt.y * t.n12 + yt.z * t.n13) + 0.5),
                  (B =
                    0.5 * -(yt.x * t.n21 + yt.y * t.n22 + yt.z * t.n23) + 0.5),
                  yt.copy(l.vertexNormalsWorld[c]),
                  (A =
                    0.5 * (yt.x * t.n11 + yt.y * t.n12 + yt.z * t.n13) + 0.5),
                  (O =
                    0.5 * -(yt.x * t.n21 + yt.y * t.n22 + yt.z * t.n23) + 0.5),
                  Ht(m, R, T, y, g, x, j, W, P, B, A, O, E.envMap)
                )
            : E.wireframe
              ? gt(
                  E.color,
                  E.wireframeLinewidth,
                  E.wireframeLinecap,
                  E.wireframeLinejoin
                )
              : xt(E.color)
        : E instanceof THREE.MeshLambertMaterial
          ? (
              E.map &&
                !E.wireframe &&
                (
                  E.map.mapping instanceof THREE.UVMapping &&
                    (
                      (L = l.uvs[0]),
                      Ht(
                        m,
                        R,
                        T,
                        y,
                        g,
                        x,
                        L[o].u,
                        L[o].v,
                        L[s].u,
                        L[s].v,
                        L[c].u,
                        L[c].v,
                        E.map
                      )
                    ),
                  e(THREE.SubtractiveBlending)
                ),
              ft
                ? E.wireframe ||
                    E.shading != THREE.SmoothShading ||
                    3 != l.vertexNormalsWorld.length
                  ? (
                      (ot.r = mt.r),
                      (ot.g = mt.g),
                      (ot.b = mt.b),
                      Y(a, l.centroidWorld, l.normalWorld, ot),
                      (ot.r = Math.max(0, Math.min(E.color.r * ot.r, 1))),
                      (ot.g = Math.max(0, Math.min(E.color.g * ot.g, 1))),
                      (ot.b = Math.max(0, Math.min(E.color.b * ot.b, 1))),
                      E.wireframe
                        ? gt(
                            ot,
                            E.wireframeLinewidth,
                            E.wireframeLinecap,
                            E.wireframeLinejoin
                          )
                        : xt(ot)
                    )
                  : (
                      (st.r = at.r = ht.r = mt.r),
                      (st.g = at.g = ht.g = mt.g),
                      (st.b = at.b = ht.b = mt.b),
                      Y(a, l.v1.positionWorld, l.vertexNormalsWorld[0], st),
                      Y(a, l.v2.positionWorld, l.vertexNormalsWorld[1], at),
                      Y(a, l.v3.positionWorld, l.vertexNormalsWorld[2], ht),
                      (st.r = Math.max(0, Math.min(E.color.r * st.r, 1))),
                      (st.g = Math.max(0, Math.min(E.color.g * st.g, 1))),
                      (st.b = Math.max(0, Math.min(E.color.b * st.b, 1))),
                      (at.r = Math.max(0, Math.min(E.color.r * at.r, 1))),
                      (at.g = Math.max(0, Math.min(E.color.g * at.g, 1))),
                      (at.b = Math.max(0, Math.min(E.color.b * at.b, 1))),
                      (ht.r = Math.max(0, Math.min(E.color.r * ht.r, 1))),
                      (ht.g = Math.max(0, Math.min(E.color.g * ht.g, 1))),
                      (ht.b = Math.max(0, Math.min(E.color.b * ht.b, 1))),
                      (ct.r = 0.5 * (at.r + ht.r)),
                      (ct.g = 0.5 * (at.g + ht.g)),
                      (ct.b = 0.5 * (at.b + ht.b)),
                      (C = wt(st, at, ht, ct)),
                      vt(m, R, T, y, g, x, 0, 0, 1, 0, 0, 1, C)
                    )
                : E.wireframe
                  ? gt(
                      E.color,
                      E.wireframeLinewidth,
                      E.wireframeLinecap,
                      E.wireframeLinejoin
                    )
                  : xt(E.color)
            )
          : E instanceof THREE.MeshDepthMaterial
            ? (
                (z = h.near),
                (V = h.far),
                (st.r = st.g = st.b = 1 - Mt(t.positionScreen.z, z, V)),
                (at.r = at.g = at.b = 1 - Mt(n.positionScreen.z, z, V)),
                (ht.r = ht.g = ht.b = 1 - Mt(r.positionScreen.z, z, V)),
                (ct.r = 0.5 * (at.r + ht.r)),
                (ct.g = 0.5 * (at.g + ht.g)),
                (ct.b = 0.5 * (at.b + ht.b)),
                (C = wt(st, at, ht, ct)),
                vt(m, R, T, y, g, x, 0, 0, 1, 0, 0, 1, C)
              )
            : E instanceof THREE.MeshNormalMaterial &&
                (
                  (ot.r = bt(l.normalWorld.x)),
                  (ot.g = bt(l.normalWorld.y)),
                  (ot.b = bt(l.normalWorld.z)),
                  E.wireframe
                    ? gt(
                        ot,
                        E.wireframeLinewidth,
                        E.wireframeLinecap,
                        E.wireframeLinejoin
                      )
                    : xt(ot)
                );
    }
    function J(t, n, r, o, s, c, l, E, p) {
      (U.info.render.vertices += 4), U.info.render.faces++, i(E.opacity), e(
        E.blending
      ), E.map || E.envMap
        ? (Q(t, n, o, 0, 1, 3, l, E, p), Q(s, r, c, 1, 2, 3, l, E, p))
        : (
            (m = t.positionScreen.x),
            (R = t.positionScreen.y),
            (T = n.positionScreen.x),
            (y = n.positionScreen.y),
            (g = r.positionScreen.x),
            (x = r.positionScreen.y),
            (H = o.positionScreen.x),
            (v = o.positionScreen.y),
            (w = s.positionScreen.x),
            (M = s.positionScreen.y),
            (b = c.positionScreen.x),
            (S = c.positionScreen.y),
            E instanceof THREE.MeshBasicMaterial
              ? (
                  $(m, R, T, y, g, x, H, v),
                  E.wireframe
                    ? gt(
                        E.color,
                        E.wireframeLinewidth,
                        E.wireframeLinecap,
                        E.wireframeLinejoin
                      )
                    : xt(E.color)
                )
              : E instanceof THREE.MeshLambertMaterial
                ? ft
                  ? E.wireframe ||
                      E.shading != THREE.SmoothShading ||
                      4 != l.vertexNormalsWorld.length
                    ? (
                        (ot.r = mt.r),
                        (ot.g = mt.g),
                        (ot.b = mt.b),
                        Y(a, l.centroidWorld, l.normalWorld, ot),
                        (ot.r = Math.max(0, Math.min(E.color.r * ot.r, 1))),
                        (ot.g = Math.max(0, Math.min(E.color.g * ot.g, 1))),
                        (ot.b = Math.max(0, Math.min(E.color.b * ot.b, 1))),
                        $(m, R, T, y, g, x, H, v),
                        E.wireframe
                          ? gt(
                              ot,
                              E.wireframeLinewidth,
                              E.wireframeLinecap,
                              E.wireframeLinejoin
                            )
                          : xt(ot)
                      )
                    : (
                        (st.r = at.r = ht.r = ct.r = mt.r),
                        (st.g = at.g = ht.g = ct.g = mt.g),
                        (st.b = at.b = ht.b = ct.b = mt.b),
                        Y(a, l.v1.positionWorld, l.vertexNormalsWorld[0], st),
                        Y(a, l.v2.positionWorld, l.vertexNormalsWorld[1], at),
                        Y(a, l.v4.positionWorld, l.vertexNormalsWorld[3], ht),
                        Y(a, l.v3.positionWorld, l.vertexNormalsWorld[2], ct),
                        (st.r = Math.max(0, Math.min(E.color.r * st.r, 1))),
                        (st.g = Math.max(0, Math.min(E.color.g * st.g, 1))),
                        (st.b = Math.max(0, Math.min(E.color.b * st.b, 1))),
                        (at.r = Math.max(0, Math.min(E.color.r * at.r, 1))),
                        (at.g = Math.max(0, Math.min(E.color.g * at.g, 1))),
                        (at.b = Math.max(0, Math.min(E.color.b * at.b, 1))),
                        (ht.r = Math.max(0, Math.min(E.color.r * ht.r, 1))),
                        (ht.g = Math.max(0, Math.min(E.color.g * ht.g, 1))),
                        (ht.b = Math.max(0, Math.min(E.color.b * ht.b, 1))),
                        (ct.r = Math.max(0, Math.min(E.color.r * ct.r, 1))),
                        (ct.g = Math.max(0, Math.min(E.color.g * ct.g, 1))),
                        (ct.b = Math.max(0, Math.min(E.color.b * ct.b, 1))),
                        (C = wt(st, at, ht, ct)),
                        K(m, R, T, y, H, v),
                        vt(m, R, T, y, H, v, 0, 0, 1, 0, 0, 1, C),
                        K(w, M, g, x, b, S),
                        vt(w, M, g, x, b, S, 1, 0, 1, 1, 0, 1, C)
                      )
                  : (
                      $(m, R, T, y, g, x, H, v),
                      E.wireframe
                        ? gt(
                            E.color,
                            E.wireframeLinewidth,
                            E.wireframeLinecap,
                            E.wireframeLinejoin
                          )
                        : xt(E.color)
                    )
                : E instanceof THREE.MeshNormalMaterial
                  ? (
                      (ot.r = bt(l.normalWorld.x)),
                      (ot.g = bt(l.normalWorld.y)),
                      (ot.b = bt(l.normalWorld.z)),
                      $(m, R, T, y, g, x, H, v),
                      E.wireframe
                        ? gt(
                            ot,
                            E.wireframeLinewidth,
                            E.wireframeLinecap,
                            E.wireframeLinejoin
                          )
                        : xt(ot)
                    )
                  : E instanceof THREE.MeshDepthMaterial &&
                      (
                        (z = h.near),
                        (V = h.far),
                        (st.r = st.g = st.b = 1 - Mt(t.positionScreen.z, z, V)),
                        (at.r = at.g = at.b = 1 - Mt(n.positionScreen.z, z, V)),
                        (ht.r = ht.g = ht.b = 1 - Mt(o.positionScreen.z, z, V)),
                        (ct.r = ct.g = ct.b = 1 - Mt(r.positionScreen.z, z, V)),
                        (C = wt(st, at, ht, ct)),
                        K(m, R, T, y, H, v),
                        vt(m, R, T, y, H, v, 0, 0, 1, 0, 0, 1, C),
                        K(w, M, g, x, b, S),
                        vt(w, M, g, x, b, S, 1, 0, 1, 1, 0, 1, C)
                      )
          );
    }
    function K(t, i, e, n, r, o) {
      X.beginPath(), X.moveTo(t, i), X.lineTo(e, n), X.lineTo(r, o), X.lineTo(
        t,
        i
      ), X.closePath();
    }
    function $(t, i, e, n, r, o, s, a) {
      X.beginPath(), X.moveTo(t, i), X.lineTo(e, n), X.lineTo(r, o), X.lineTo(
        s,
        a
      ), X.lineTo(t, i), X.closePath();
    }
    function gt(t, i, e, r) {
      tt != i && (X.lineWidth = tt = i), it != e && (X.lineCap = it = e), et !=
        r && (X.lineJoin = et = r), n(
        t.getContextStyle()
      ), X.stroke(), dt.inflate(2 * i);
    }
    function xt(t) {
      r(t.getContextStyle()), X.fill();
    }
    function Ht(t, i, e, n, o, s, a, h, c, l, E, p, u) {
      if (0 != u.image.width) {
        if (1 == u.needsUpdate || void 0 == lt[u.id]) {
          var d = u.wrapS == THREE.RepeatWrapping,
            f = u.wrapT == THREE.RepeatWrapping;
          (lt[u.id] = X.createPattern(
            u.image,
            d && f
              ? "repeat"
              : d && !f ? "repeat-x" : !d && f ? "repeat-y" : "no-repeat"
          )), (u.needsUpdate = !1);
        }
        r(lt[u.id]);
        var d = u.offset.x / u.repeat.x,
          f = u.offset.y / u.repeat.y,
          m = u.image.width * u.repeat.x,
          R = u.image.height * u.repeat.y,
          a = (a + d) * m,
          h = (h + f) * R,
          c = (c + d) * m,
          l = (l + f) * R,
          E = (E + d) * m,
          p = (p + f) * R;
        (e -= t), (n -= i), (o -= t), (s -= i), (c -= a), (l -= h), (E -= a), (p -= h), (d =
          c * p - E * l), 0 == d
          ? (
              void 0 == Et[u.id] &&
                (
                  (i = document.createElement("canvas")),
                  (i.width = u.image.width),
                  (i.height = u.image.height),
                  (t = i.getContext("2d")),
                  t.drawImage(u.image, 0, 0),
                  (Et[u.id] = t.getImageData(
                    0,
                    0,
                    u.image.width,
                    u.image.height
                  ).data),
                  delete i
                ),
              (i = Et[u.id]),
              (a = 4 * (Math.floor(a) + Math.floor(h) * u.image.width)),
              ot.setRGB(i[a] / 255, i[a + 1] / 255, i[a + 2] / 255),
              xt(ot)
            )
          : (
              (d = 1 / d),
              (u = (p * e - l * o) * d),
              (l = (p * n - l * s) * d),
              (e = (c * o - E * e) * d),
              (n = (c * s - E * n) * d),
              (t = t - u * a - e * h),
              (a = i - l * a - n * h),
              X.save(),
              X.transform(u, l, e, n, t, a),
              X.fill(),
              X.restore()
            );
      }
    }
    function vt(t, i, e, n, r, o, s, a, h, c, l, E, p) {
      var u, d;
      (u = p.width - 1), (d =
        p.height -
        1), (s *= u), (a *= d), (h *= u), (c *= d), (l *= u), (E *= d), (e -= t), (n -= i), (r -= t), (o -= i), (h -= s), (c -= a), (l -= s), (E -= a), (d =
        1 / (h * E - l * c)), (u = (E * e - c * r) * d), (c =
        (E * n - c * o) * d), (e = (h * r - l * e) * d), (n =
        (h * o - l * n) * d), (t = t - u * s - e * a), (i =
        i - c * s - n * a), X.save(), X.transform(
        u,
        c,
        e,
        n,
        t,
        i
      ), X.clip(), X.drawImage(p, 0, 0), X.restore();
    }
    function wt(t, i, e, n) {
      var r = ~~(255 * t.r),
        o = ~~(255 * t.g),
        t = ~~(255 * t.b),
        s = ~~(255 * i.r),
        a = ~~(255 * i.g),
        i = ~~(255 * i.b),
        h = ~~(255 * e.r),
        c = ~~(255 * e.g),
        e = ~~(255 * e.b),
        l = ~~(255 * n.r),
        E = ~~(255 * n.g),
        n = ~~(255 * n.b);
      return (D[0] = r < 0 ? 0 : r > 255 ? 255 : r), (D[1] = o < 0
        ? 0
        : o > 255 ? 255 : o), (D[2] = t < 0
        ? 0
        : t > 255 ? 255 : t), (D[4] = s < 0
        ? 0
        : s > 255 ? 255 : s), (D[5] = a < 0
        ? 0
        : a > 255 ? 255 : a), (D[6] = i < 0
        ? 0
        : i > 255 ? 255 : i), (D[8] = h < 0
        ? 0
        : h > 255 ? 255 : h), (D[9] = c < 0
        ? 0
        : c > 255 ? 255 : c), (D[10] = e < 0
        ? 0
        : e > 255 ? 255 : e), (D[12] = l < 0
        ? 0
        : l > 255 ? 255 : l), (D[13] = E < 0
        ? 0
        : E > 255 ? 255 : E), (D[14] = n < 0
        ? 0
        : n > 255 ? 255 : n), F.putImageData(N, 0, 0), k.drawImage(_, 0, 0), I;
    }
    function Mt(t, i, e) {
      return (t = (t - i) / (e - i)), t * t * (3 - 2 * t);
    }
    function bt(t) {
      return (t = 0.5 * (t + 1)), t < 0 ? 0 : t > 1 ? 1 : t;
    }
    function St(t, i) {
      var e = i.x - t.x,
        n = i.y - t.y,
        r = e * e + n * n;
      0 != r &&
        (
          (r = 1 / Math.sqrt(r)),
          (e *= r),
          (n *= r),
          (i.x += e),
          (i.y += n),
          (t.x -= e),
          (t.y -= n)
        );
    }
    var zt, Vt, Ct, Lt;
    for (
      this.autoClear
        ? this.clear()
        : X.setTransform(
            1,
            0,
            0,
            -1,
            l,
            E
          ), U.info.render.vertices = 0, U.info.render.faces = 0, o = q.projectScene(
        t,
        h,
        this.sortElements
      ), s = o.elements, a = o.lights, (ft = a.length > 0) && c(a), zt = 0, Vt =
        s.length;
      zt < Vt;
      zt++
    )
      (Ct = s[zt]), (Lt = Ct.material), (Lt = Lt instanceof
        THREE.MeshFaceMaterial
        ? Ct.faceMaterial
        : Lt), null == Lt ||
        0 == Lt.opacity ||
        (
          dt.empty(),
          Ct instanceof THREE.RenderableParticle
            ? ((p = Ct), (p.x *= l), (p.y *= E), G(p, Ct, Lt, t))
            : Ct instanceof THREE.RenderableLine
              ? (
                  (p = Ct.v1),
                  (u = Ct.v2),
                  (p.positionScreen.x *= l),
                  (p.positionScreen.y *= E),
                  (u.positionScreen.x *= l),
                  (u.positionScreen.y *= E),
                  dt.addPoint(p.positionScreen.x, p.positionScreen.y),
                  dt.addPoint(u.positionScreen.x, u.positionScreen.y),
                  pt.intersects(dt) && Z(p, u, Ct, Lt, t)
                )
              : Ct instanceof THREE.RenderableFace3
                ? (
                    (p = Ct.v1),
                    (u = Ct.v2),
                    (d = Ct.v3),
                    (p.positionScreen.x *= l),
                    (p.positionScreen.y *= E),
                    (u.positionScreen.x *= l),
                    (u.positionScreen.y *= E),
                    (d.positionScreen.x *= l),
                    (d.positionScreen.y *= E),
                    Lt.overdraw &&
                      (
                        St(p.positionScreen, u.positionScreen),
                        St(u.positionScreen, d.positionScreen),
                        St(d.positionScreen, p.positionScreen)
                      ),
                    dt.add3Points(
                      p.positionScreen.x,
                      p.positionScreen.y,
                      u.positionScreen.x,
                      u.positionScreen.y,
                      d.positionScreen.x,
                      d.positionScreen.y
                    ),
                    pt.intersects(dt) && Q(p, u, d, 0, 1, 2, Ct, Lt, t)
                  )
                : Ct instanceof THREE.RenderableFace4 &&
                    (
                      (p = Ct.v1),
                      (u = Ct.v2),
                      (d = Ct.v3),
                      (f = Ct.v4),
                      (p.positionScreen.x *= l),
                      (p.positionScreen.y *= E),
                      (u.positionScreen.x *= l),
                      (u.positionScreen.y *= E),
                      (d.positionScreen.x *= l),
                      (d.positionScreen.y *= E),
                      (f.positionScreen.x *= l),
                      (f.positionScreen.y *= E),
                      nt.positionScreen.copy(u.positionScreen),
                      rt.positionScreen.copy(f.positionScreen),
                      Lt.overdraw &&
                        (
                          St(p.positionScreen, u.positionScreen),
                          St(u.positionScreen, f.positionScreen),
                          St(f.positionScreen, p.positionScreen),
                          St(d.positionScreen, nt.positionScreen),
                          St(d.positionScreen, rt.positionScreen)
                        ),
                      dt.addPoint(p.positionScreen.x, p.positionScreen.y),
                      dt.addPoint(u.positionScreen.x, u.positionScreen.y),
                      dt.addPoint(d.positionScreen.x, d.positionScreen.y),
                      dt.addPoint(f.positionScreen.x, f.positionScreen.y),
                      pt.intersects(dt) && J(p, u, d, f, nt, rt, Ct, Lt, t)
                    ),
          ut.addRectangle(dt)
        );
    X.setTransform(1, 0, 0, 1, 0, 0);
  });
}), (THREE.RenderableVertex = function() {
  (this.positionWorld = new THREE.Vector3()), (this.positionScreen = new THREE.Vector4()), (this.visible = !0);
}), (THREE.RenderableVertex.prototype.copy = function(t) {
  this.positionWorld.copy(t.positionWorld), this.positionScreen.copy(
    t.positionScreen
  );
}), (THREE.RenderableFace3 = function() {
  (this.v1 = new THREE.RenderableVertex()), (this.v2 = new THREE.RenderableVertex()), (this.v3 = new THREE.RenderableVertex()), (this.centroidWorld = new THREE.Vector3()), (this.centroidScreen = new THREE.Vector3()), (this.normalWorld = new THREE.Vector3()), (this.vertexNormalsWorld = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]), (this.faceMaterial = this.material = null), (this.uvs = [
    []
  ]), (this.z = null);
}), (THREE.RenderableFace4 = function() {
  (this.v1 = new THREE.RenderableVertex()), (this.v2 = new THREE.RenderableVertex()), (this.v3 = new THREE.RenderableVertex()), (this.v4 = new THREE.RenderableVertex()), (this.centroidWorld = new THREE.Vector3()), (this.centroidScreen = new THREE.Vector3()), (this.normalWorld = new THREE.Vector3()), (this.vertexNormalsWorld = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]), (this.faceMaterial = this.material = null), (this.uvs = [
    []
  ]), (this.z = null);
}), (THREE.RenderableObject = function() {
  this.z = this.object = null;
}), (THREE.RenderableParticle = function() {
  (this.rotation = this.z = this.y = this.x = null), (this.scale = new THREE.Vector2()), (this.material = null);
}), (THREE.RenderableLine = function() {
  (this.z = null), (this.v1 = new THREE.RenderableVertex()), (this.v2 = new THREE.RenderableVertex()), (this.material = null);
}), (Particle3D = function(t) {
  THREE.Particle.call(this, t), (this.velocity = new THREE.Vector3(
    0,
    0,
    0
  )), this.velocity.rotateX(10), (this.gravity = new THREE.Vector3(
    0,
    0,
    0.2
  )), (this.drag = 1);
}), (Particle3D.prototype = new THREE.Particle()), (Particle3D.prototype.constructor = Particle3D), (Particle3D.prototype.updatePhysics = function() {
  this.velocity.multiplyScalar(this.drag), this.velocity.addSelf(
    this.gravity
  ), this.position.addSelf(this.velocity);
});
var TO_RADIANS = Math.PI / 180;
(THREE.Vector3.prototype.rotateY = function(t) {
  (cosRY = Math.cos(t * TO_RADIANS)), (sinRY = Math.sin(t * TO_RADIANS));
  var i = this.z,
    e = this.x;
  (this.x = e * cosRY + i * sinRY), (this.z = e * -sinRY + i * cosRY);
}), (THREE.Vector3.prototype.rotateX = function(t) {
  (cosRY = Math.cos(t * TO_RADIANS)), (sinRY = Math.sin(t * TO_RADIANS));
  var i = this.z,
    e = this.y;
  (this.y = e * cosRY + i * sinRY), (this.z = e * -sinRY + i * cosRY);
}), (THREE.Vector3.prototype.rotateZ = function(t) {
  (cosRY = Math.cos(t * TO_RADIANS)), (sinRY = Math.sin(t * TO_RADIANS));
  var i = this.x,
    e = this.y;
  (this.y = e * cosRY + i * sinRY), (this.x = e * -sinRY + i * cosRY);
});
var SCREEN_WIDTH = window.innerWidth,
  SCREEN_HEIGHT = window.innerHeight,
  container,
  particle,
  camera,
  scene,
  renderer,
  starSnow = 1,
  particles = [],
  particleImage = new Image();
(particleImage.src = "./pic.png"), init();
var touchStartX,
  touchFlag = 0,
  touchSensitive = 80;
