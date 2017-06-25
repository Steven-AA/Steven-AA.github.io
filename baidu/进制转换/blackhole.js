!(function(a, b) {
  if (typeof define == "function" && define.amd) {
    define(b);
  } else {
    this[a] = b();
  }
})("blackhole", function() {
  (function() {
    var O = 0;
    var P = ["ms", "moz", "webkit", "o"];
    for (var N = 0; N < P.length && !window.requestAnimationFrame; ++N) {
      window.requestAnimationFrame = window[P[N] + "RequestAnimationFrame"];
      window.cancelAnimationFrame =
        window[P[N] + "CancelAnimationFrame"] ||
        window[P[N] + "CancelRequestAnimationFrame"];
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(U, R) {
        var Q = new Date().getTime();
        var S = Math.max(0, 16 - (Q - O));
        var T = window.setTimeout(function() {
          U(Q + S);
        }, S);
        O = Q + S;
        return T;
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(Q) {
        clearTimeout(Q);
      };
    }
  })();
  var x = (function() {
    var N = true;
    function O(Z) {
      function V(ab) {
        var ac = Z.match(ab);
        return (ac && ac.length > 1 && ac[1]) || "";
      }
      var R = V(/(ipod|iphone|ipad)/i).toLowerCase(),
        S = /like android/i.test(Z),
        X = !S && /android/i.test(Z),
        aa = V(/version\/(\d+(\.\d+)?)/i),
        T = /tablet/i.test(Z),
        Y = !T && /[^-]mobi/i.test(Z),
        Q;
      if (/opera|opr/i.test(Z)) {
        Q = {
          name: "Opera",
          opera: N,
          version: aa || V(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
        };
      } else {
        if (/windows phone/i.test(Z)) {
          Q = {
            name: "Windows Phone",
            windowsphone: N,
            msie: N,
            version: V(/iemobile\/(\d+(\.\d+)?)/i)
          };
        } else {
          if (/msie|trident/i.test(Z)) {
            Q = {
              name: "Internet Explorer",
              msie: N,
              version: V(/(?:msie |rv:)(\d+(\.\d+)?)/i)
            };
          } else {
            if (/chrome|crios|crmo/i.test(Z)) {
              Q = {
                name: "Chrome",
                chrome: N,
                version: V(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
              };
            } else {
              if (R) {
                Q = {
                  name: R == "iphone" ? "iPhone" : R == "ipad" ? "iPad" : "iPod"
                };
                if (aa) {
                  Q.version = aa;
                }
              } else {
                if (/sailfish/i.test(Z)) {
                  Q = {
                    name: "Sailfish",
                    sailfish: N,
                    version: V(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                  };
                } else {
                  if (/seamonkey\//i.test(Z)) {
                    Q = {
                      name: "SeaMonkey",
                      seamonkey: N,
                      version: V(/seamonkey\/(\d+(\.\d+)?)/i)
                    };
                  } else {
                    if (/firefox|iceweasel/i.test(Z)) {
                      Q = {
                        name: "Firefox",
                        firefox: N,
                        version: V(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
                      };
                      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(Z)) {
                        Q.firefoxos = N;
                      }
                    } else {
                      if (/silk/i.test(Z)) {
                        Q = {
                          name: "Amazon Silk",
                          silk: N,
                          version: V(/silk\/(\d+(\.\d+)?)/i)
                        };
                      } else {
                        if (X) {
                          Q = { name: "Android", version: aa };
                        } else {
                          if (/phantom/i.test(Z)) {
                            Q = {
                              name: "PhantomJS",
                              phantom: N,
                              version: V(/phantomjs\/(\d+(\.\d+)?)/i)
                            };
                          } else {
                            if (
                              /blackberry|\bbb\d+/i.test(Z) ||
                              /rim\stablet/i.test(Z)
                            ) {
                              Q = {
                                name: "BlackBerry",
                                blackberry: N,
                                version:
                                  aa || V(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                              };
                            } else {
                              if (/(web|hpw)os/i.test(Z)) {
                                Q = {
                                  name: "WebOS",
                                  webos: N,
                                  version:
                                    aa || V(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                                };
                                /touchpad\//i.test(Z) && (Q.touchpad = N);
                              } else {
                                if (/bada/i.test(Z)) {
                                  Q = {
                                    name: "Bada",
                                    bada: N,
                                    version: V(/dolfin\/(\d+(\.\d+)?)/i)
                                  };
                                } else {
                                  if (/tizen/i.test(Z)) {
                                    Q = {
                                      name: "Tizen",
                                      tizen: N,
                                      version:
                                        V(
                                          /(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i
                                        ) || aa
                                    };
                                  } else {
                                    if (/safari/i.test(Z)) {
                                      Q = {
                                        name: "Safari",
                                        safari: N,
                                        version: aa
                                      };
                                    } else {
                                      Q = {};
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (/(apple)?webkit/i.test(Z)) {
        Q.name = Q.name || "Webkit";
        Q.webkit = N;
        if (!Q.version && aa) {
          Q.version = aa;
        }
      } else {
        if (!Q.opera && /gecko\//i.test(Z)) {
          Q.name = Q.name || "Gecko";
          Q.gecko = N;
          Q.version = Q.version || V(/gecko\/(\d+(\.\d+)?)/i);
        }
      }
      if (X || Q.silk) {
        Q.android = N;
      } else {
        if (R) {
          Q[R] = N;
          Q.ios = N;
        }
      }
      var W = "";
      if (R) {
        W = V(/os (\d+([_\s]\d+)*) like mac os x/i);
        W = W.replace(/[_\s]/g, ".");
      } else {
        if (X) {
          W = V(/android[ \/-](\d+(\.\d+)*)/i);
        } else {
          if (Q.windowsphone) {
            W = V(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
          } else {
            if (Q.webos) {
              W = V(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
            } else {
              if (Q.blackberry) {
                W = V(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
              } else {
                if (Q.bada) {
                  W = V(/bada\/(\d+(\.\d+)*)/i);
                } else {
                  if (Q.tizen) {
                    W = V(/tizen[\/\s](\d+(\.\d+)*)/i);
                  }
                }
              }
            }
          }
        }
      }
      if (W) {
        Q.osversion = W;
      }
      var U = W.split(".")[0];
      if (T || R == "ipad" || (X && (U == 3 || (U == 4 && !Y))) || Q.silk) {
        Q.tablet = N;
      } else {
        if (
          Y ||
          R == "iphone" ||
          R == "ipod" ||
          X ||
          Q.blackberry ||
          Q.webos ||
          Q.bada
        ) {
          Q.mobile = N;
        }
      }
      if (
        (Q.msie && Q.version >= 10) ||
        (Q.chrome && Q.version >= 20) ||
        (Q.firefox && Q.version >= 20) ||
        (Q.safari && Q.version >= 6) ||
        (Q.opera && Q.version >= 10) ||
        (Q.ios && Q.osversion && Q.osversion.split(".")[0] >= 6) ||
        (Q.blackberry && Q.version >= 10.1)
      ) {
        Q.a = N;
      } else {
        if (
          (Q.msie && Q.version < 10) ||
          (Q.chrome && Q.version < 20) ||
          (Q.firefox && Q.version < 20) ||
          (Q.safari && Q.version < 6) ||
          (Q.opera && Q.version < 10) ||
          (Q.ios && Q.osversion && Q.osversion.split(".")[0] < 6)
        ) {
          Q.c = N;
        } else {
          Q.x = N;
        }
      }
      return Q;
    }
    var P = O(typeof navigator !== "undefined" ? navigator.userAgent : "");
    P._detect = O;
    return P;
  })();
  var C = 302;
  var K = 303;
  var s = (function() {
    var R, S;
    var N;
    var W;
    function O(Z) {
      N = Z;
      R = true;
      W = requestAnimationFrame(T);
    }
    function X() {
      R = false;
      cancelAnimationFrame(W);
    }
    function T() {
      if (!R) {
        return;
      }
      if (N) {
        N();
      }
      W = requestAnimationFrame(T);
    }
    Vector2 = function(Z, aa) {
      this.x = Z;
      this.y = aa;
    };
    Vector2.prototype = {
      copy: function() {
        return new Vector2(this.x, this.y);
      },
      length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      sqrLength: function() {
        return this.x * this.x + this.y * this.y;
      },
      normalize: function() {
        var Z = 1 / this.length();
        return new Vector2(this.x * Z, this.y * Z);
      },
      negate: function() {
        return new Vector2(-this.x, -this.y);
      },
      add: function(Z) {
        return new Vector2(this.x + Z.x, this.y + Z.y);
      },
      subtract: function(Z) {
        return new Vector2(this.x - Z.x, this.y - Z.y);
      },
      multiply: function(Z) {
        return new Vector2(this.x * Z, this.y * Z);
      },
      divide: function(aa) {
        var Z = 1 / aa;
        return new Vector2(this.x * Z, this.y * Z);
      },
      dot: function(Z) {
        return this.x * Z.x + this.y * Z.y;
      }
    };
    Vector2.zero = new Vector2(0, 0);
    Vector2.one = new Vector2(1, 1);
    var Q = 0;
    Particle = function(aa, ab, Z) {
      this.id = Q++;
      this.position = Vector2.zero;
      this.velocity = ab;
      this.acceleration = Vector2.zero;
      this.age = 0;
      this.life = 1;
      this.size = 5;
      this.$e = aa;
      this.dst = ab;
      this.startStep = Z;
      this.scale = 1;
      this.initDistance = this.dst.sqrLength();
      this.distance = this.initDistance;
    };
    var P = 0.02;
    var V = 100000;
    Particle.prototype.update = function() {
      this.position = this.position.add(this.velocity.multiply(P));
      this.velocity = this.velocity.add(this.acceleration.multiply(P));
      if (this.isReached()) {
        this.position = this.dst;
      }
      this.distance = this.dst.subtract(this.position).sqrLength();
      if (this.distance <= V) {
        this.scale = this.distance / Math.min(V, this.initDistance);
        this.scale = Math.max(this.scale, 0.1);
        this.scale = Math.min(this.scale, 1);
      }
    };
    Particle.prototype.isReached = function() {
      return (
        Math.abs(this.position.x) >= Math.abs(this.dst.x) &&
        Math.abs(this.position.y) >= Math.abs(this.dst.y)
      );
    };
    function Y() {
      var ae = this;
      var ad = new Array();
      this.particles = ad;
      var ac = { particleComplete: null, allComplete: null };
      this.gravity = new Vector2(0, 100);
      this.effectors = new Array();
      var ab = f;
      this.init = function(af) {
        if (af) {
          $.extend(ac, af);
        }
        ab = f;
      };
      this.emit = function(af) {
        ad.push(af);
      };
      var aa = 0;
      this.render = function() {
        ++aa;
        var aj = $(window).width();
        var ag = $(window).height();
        for (var ai in ad) {
          var ak = ad[ai];
          if (aa < ak.startStep) {
            continue;
          }
          if (aa == ak.startStep) {
            ak.$e.css({ position: "relative", zIndex: K });
          }
          ab += 1;
          var af = ac.x - ab / 2;
          var al = ac.y - ab / 2 - $(document).scrollTop();
          $(".ops-blackhole").css({
            width: ab,
            height: ab,
            left: af,
            top: al,
            zIndex: C
          });
          ak.update();
          var ah = "scale(" + ak.scale + ", " + ak.scale + ") ";
          ah +=
            "translate(" +
            ak.position.x / ak.scale +
            "px, " +
            ak.position.y / ak.scale +
            "px)";
          e(ak.$e, ah);
          if (ak.isReached()) {
            if (ac.particleComplete) {
              ac.particleComplete(ak);
            }
            Z(ai);
            if (this.particles.length == 0) {
              if (ac.allComplete) {
                ac.allComplete();
              }
            }
          }
        }
      };
      function Z(af) {
        if (ad.length > 1) {
          ad[af] = ad[ad.length - 1];
        }
        ad.pop();
      }
    }
    var U = {
      Vector2: Vector2,
      Particle: Particle,
      ParticleSystem: Y,
      start: O,
      stop: X
    };
    return U;
  })();
  var l = "./blackhole.png";
  var m = "./close.png";
  function M() {
    var N =
      "display: none;width:0;height:0;animation: rotates 15s linear infinite;-moz-animation: rotates 15s linear infinite; -webkit-animation: rotates 15s linear infinite;-ms-animation: rotates 15s linear infinite;-o-animation: rotates 15s linear infinite;position:fixed;z-index:0;";
    if ($(".ops-blackhole").length == 0) {
      var P =
        '<style type="text/css">@-webkit-keyframes rotates{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}@-ms-keyframes rotates{from{-ms-transform:rotate(0deg)}to{-ms-transform:rotate(360deg)}}@-moz-keyframes rotates{from{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(360deg)}}@-o-keyframes rotates{from{-o-transform:rotate(0deg)}to{-o-transform:rotate(360deg)}}</style>';
      var O =
        "<img src=" +
        l +
        ' class="ops-blackhole" style="' +
        N +
        '"><img src=' +
        m +
        ' class="ops-close OP_LOG_BTN" data-click="{\'fm\':\'beha\'}" style="width:50px;height:50px;box-shadow:0px 0px 3px #000;position:fixed;top:100px;right:50px;z-index:305;cursor: pointer; display:none;">';
      O += P;
      $(document.body).prepend(O);
    } else {
      $(".ops-blackhole").attr("style", N);
      $(".ops-close").show();
    }
  }
  var c = "#wrapper_wrapper";
  var h = "#wrapper_wrapper img, #bds-wraper img";
  var z = "data-blackhole-";
  var o = [
    "position",
    "z-index",
    "top",
    "left",
    "width",
    "height",
    "transform",
    "-webkit-transform",
    "-moz-transform",
    "-ms-transform",
    "-o-transform"
  ];
  function n(R) {
    for (var P = 0; P < o.length; ++P) {
      var N = o[P];
      var O = z + N;
      var Q = R.css(N);
      R.data(O, Q);
    }
  }
  function a(R) {
    for (var P = 0; P < o.length; ++P) {
      var N = o[P];
      var O = z + N;
      var Q = R.data(O);
      R.css(N, Q);
      R.removeData(O);
    }
  }
  var p = 30;
  var D = "0%";
  var v = 400;
  var g = 0;
  var E = 0;
  var k;
  function b(P, R) {
    var N = P + $(document).scrollLeft();
    var S = R + $(document).scrollTop();
    k = new s.ParticleSystem();
    k.init({
      particleComplete: function(T) {
        T.$e.hide();
        a(T.$e);
      },
      allComplete: function() {
        B();
      },
      x: N,
      y: S
    });
    var O = 0;
    $(h).each(function() {
      if (g >= p) {
        return;
      }
      var X = $(this);
      var T = 3 - Math.floor(g / 10);
      if (T < 1) {
        T = 1;
      }
      O += T;
      ++g;
      n(X);
      var W = X.offset();
      var V = N - W.left - X.width() / 2;
      var U = S - W.top - X.height() / 2;
      k.emit(new s.Particle(X, new Vector2(V, U), O));
    });
    if (g == 0) {
      B();
    }
    function Q() {
      k.render();
    }
    s.start(Q);
  }
  var F = ["-ms-", "-webkit-", "-moz-", "-o-", ""];
  function e(O, Q) {
    var P = {};
    for (var N = 0; N < F.length; ++N) {
      P[F[N] + "transform"] = Q;
    }
    O.css(P);
  }
  function w(N, P) {
    var O = "scale(" + P + "," + P + ")";
    e(N, O);
  }
  function B() {
    e($("#wrapper_wrapper"), "scale(0,0)");
    $("#s_tab,.nums").fadeOut();
    J();
  }
  var i = 0;
  var t = 0;
  var G;
  function r() {
    i += 0.03;
    t += 0.03;
    if (i > 1) {
      i = 1;
      t = 1;
    }
    e($("#wrapper_wrapper"), "scale(" + i + "," + t + ")");
    if (i < 1) {
      G = requestAnimationFrame(r);
    }
  }
  function J() {
    $(".ops-blackhole").animate(
      {
        width: 0,
        height: 0,
        padding: 0,
        left: $(window).width() / 2,
        top: $(window).height() / 2
      },
      1000,
      function() {
        G = requestAnimationFrame(r);
        $(h).fadeIn();
        $("#s_tab,.nums").fadeIn();
        $(".ops-close").fadeOut();
      }
    );
  }
  var f = 500;
  function L(N, O) {
    $(".ops-close").fadeIn();
    $(".ops-blackhole")
      .css({ width: 0, height: 0, left: N, top: O })
      .show()
      .animate(
        { width: f, height: f, left: N - f / 2, top: O - f / 2 },
        1000,
        function() {
          b(N, O);
        }
      );
  }
  function j() {
    $(document).one("click", function(O) {
      var N = O.clientX;
      var P = O.clientY;
      L(N, P);
    });
  }
  function q() {
    var N = $(window).width() / 2;
    var O = $(window).height() / 2;
    L(N, O);
  }
  function d() {
    s.stop();
    $(h).stop(true).each(function() {
      var N = $(this);
      a(N);
      N.show();
    });
    $(c).stop(true);
    w($(c), 1);
    $(c).show();
  }
  function A(N) {
    var Q = [],
      O = 0;
    var S = function() {};
    var N = typeof N != "object" ? [N] : N;
    function R() {
      O++;
      if (O == N.length) {
        S(Q);
      }
    }
    for (var P = 0; P < N.length; P++) {
      Q[P] = new Image();
      Q[P].onload = function() {
        R();
      };
      Q[P].onerror = function() {
        R();
      };
      Q[P].src = N[P];
    }
    return {
      done: function(T) {
        S = T || S;
      }
    };
  }
  function y() {
    g = 0;
    E = 0;
  }
  function I() {
    if (x.msie && x.version <= 9) {
      return;
    }
    y();
    M();
    A([l, m]).done(function(N) {
      q();
    });
    $(".ops-close").bind("click", function() {
      u();
    });
  }
  function u() {
    cancelAnimationFrame(G);
    $(".ops-blackhole").stop(true).hide();
    $(".ops-close").hide();
    d();
  }
  var H = { init: I, dispose: u };
  return H;
});
