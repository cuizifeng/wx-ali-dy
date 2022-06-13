var r = {};
(function() {
	function t(e) {
		this.mode = o.MODE_8BIT_BYTE, this.data = e
	}

	function n(e, t) {
		this.typeNumber = e, this.errorCorrectLevel = t, this.modules = null, this.moduleCount = 0, this.dataCache =
			null, this.dataList = new Array
	}
	t.prototype = {
		getLength: function(e) {
			return this.data.length
		},
		write: function(e) {
			for (var t = 0; t < this.data.length; t++) e.put(this.data.charCodeAt(t), 8)
		}
	}, n.prototype = {
		addData: function(e) {
			var r = new t(e);
			this.dataList.push(r), this.dataCache = null
		},
		isDark: function(e, t) {
			if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t) throw new Error(e + "," + t);
			return this.modules[e][t]
		},
		getModuleCount: function() {
			return this.moduleCount
		},
		make: function() {
			if (this.typeNumber < 1) {
				var e = 1;
				for (e = 1; e < 40; e++) {
					for (var t = f.getRSBlocks(e, this.errorCorrectLevel), r = new p, n = 0, o = 0; o < t.length; o++) n +=
						t[o].dataCount;
					for (o = 0; o < this.dataList.length; o++) {
						var a = this.dataList[o];
						r.put(a.mode, 4), r.put(a.getLength(), s.getLengthInBits(a.mode, e)), a.write(r)
					}
					if (r.getLengthInBits() <= 8 * n) break
				}
				this.typeNumber = e
			}
			this.makeImpl(!1, this.getBestMaskPattern())
		},
		makeImpl: function(e, t) {
			this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
			for (var r = 0; r < this.moduleCount; r++) {
				this.modules[r] = new Array(this.moduleCount);
				for (var o = 0; o < this.moduleCount; o++) this.modules[r][o] = null
			}
			this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this
				.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this
				.setupTimingPattern(), this.setupTypeInfo(e, t), this.typeNumber >= 7 && this.setupTypeNumber(e), null ==
				this.dataCache && (this.dataCache = n.createData(this.typeNumber, this.errorCorrectLevel, this
					.dataList)), this.mapData(this.dataCache, t)
		},
		setupPositionProbePattern: function(e, t) {
			for (var r = -1; r <= 7; r++)
				if (!(e + r <= -1 || this.moduleCount <= e + r))
					for (var n = -1; n <= 7; n++) t + n <= -1 || this.moduleCount <= t + n || (this.modules[e + r][t + n] =
						0 <= r && r <= 6 && (0 == n || 6 == n) || 0 <= n && n <= 6 && (0 == r || 6 == r) || 2 <= r && r <=
						4 && 2 <= n && n <= 4)
		},
		getBestMaskPattern: function() {
			for (var e = 0, t = 0, r = 0; r < 8; r++) {
				this.makeImpl(!0, r);
				var n = s.getLostPoint(this);
				(0 == r || e > n) && (e = n, t = r)
			}
			return t
		},
		createMovieClip: function(e, t, r) {
			var n = e.createEmptyMovieClip(t, r),
				o = 1;
			this.make();
			for (var a = 0; a < this.modules.length; a++)
				for (var i = a * o, s = 0; s < this.modules[a].length; s++) {
					var c = s * o,
						u = this.modules[a][s];
					u && (n.beginFill(0, 100), n.moveTo(c, i), n.lineTo(c + o, i), n.lineTo(c + o, i + o), n.lineTo(c, i +
						o), n.endFill())
				}
			return n
		},
		setupTimingPattern: function() {
			for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[e][6] && (this.modules[e][6] = e %
				2 == 0);
			for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[6][t] && (this.modules[6][t] = t %
				2 == 0)
		},
		setupPositionAdjustPattern: function() {
			for (var e = s.getPatternPosition(this.typeNumber), t = 0; t < e.length; t++)
				for (var r = 0; r < e.length; r++) {
					var n = e[t],
						o = e[r];
					if (null == this.modules[n][o])
						for (var a = -2; a <= 2; a++)
							for (var i = -2; i <= 2; i++) this.modules[n + a][o + i] = -2 == a || 2 == a || -2 == i || 2 == i ||
								0 == a && 0 == i
				}
		},
		setupTypeNumber: function(e) {
			for (var t = s.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
				var n = !e && 1 == (t >> r & 1);
				this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = n
			}
			for (r = 0; r < 18; r++) {
				n = !e && 1 == (t >> r & 1);
				this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = n
			}
		},
		setupTypeInfo: function(e, t) {
			for (var r = this.errorCorrectLevel << 3 | t, n = s.getBCHTypeInfo(r), o = 0; o < 15; o++) {
				var a = !e && 1 == (n >> o & 1);
				o < 6 ? this.modules[o][8] = a : o < 8 ? this.modules[o + 1][8] = a : this.modules[this.moduleCount -
					15 + o][8] = a
			}
			for (o = 0; o < 15; o++) {
				a = !e && 1 == (n >> o & 1);
				o < 8 ? this.modules[8][this.moduleCount - o - 1] = a : o < 9 ? this.modules[8][15 - o - 1 + 1] = a :
					this.modules[8][15 - o - 1] = a
			}
			this.modules[this.moduleCount - 8][8] = !e
		},
		mapData: function(e, t) {
			for (var r = -1, n = this.moduleCount - 1, o = 7, a = 0, i = this.moduleCount - 1; i > 0; i -= 2) {
				6 == i && i--;
				while (1) {
					for (var c = 0; c < 2; c++)
						if (null == this.modules[n][i - c]) {
							var u = !1;
							a < e.length && (u = 1 == (e[a] >>> o & 1));
							var l = s.getMask(t, n, i - c);
							l && (u = !u), this.modules[n][i - c] = u, o--, -1 == o && (a++, o = 7)
						} if (n += r, n < 0 || this.moduleCount <= n) {
						n -= r, r = -r;
						break
					}
				}
			}
		}
	}, n.PAD0 = 236, n.PAD1 = 17, n.createData = function(e, t, r) {
		for (var o = f.getRSBlocks(e, t), a = new p, i = 0; i < r.length; i++) {
			var c = r[i];
			a.put(c.mode, 4), a.put(c.getLength(), s.getLengthInBits(c.mode, e)), c.write(a)
		}
		var u = 0;
		for (i = 0; i < o.length; i++) u += o[i].dataCount;
		if (a.getLengthInBits() > 8 * u) throw new Error("code length overflow. (" + a.getLengthInBits() + ">" + 8 *
			u + ")");
		a.getLengthInBits() + 4 <= 8 * u && a.put(0, 4);
		while (a.getLengthInBits() % 8 != 0) a.putBit(!1);
		while (1) {
			if (a.getLengthInBits() >= 8 * u) break;
			if (a.put(n.PAD0, 8), a.getLengthInBits() >= 8 * u) break;
			a.put(n.PAD1, 8)
		}
		return n.createBytes(a, o)
	}, n.createBytes = function(e, t) {
		for (var r = 0, n = 0, o = 0, a = new Array(t.length), i = new Array(t.length), c = 0; c < t.length; c++) {
			var u = t[c].dataCount,
				f = t[c].totalCount - u;
			n = Math.max(n, u), o = Math.max(o, f), a[c] = new Array(u);
			for (var p = 0; p < a[c].length; p++) a[c][p] = 255 & e.buffer[p + r];
			r += u;
			var d = s.getErrorCorrectPolynomial(f),
				h = new l(a[c], d.getLength() - 1),
				g = h.mod(d);
			i[c] = new Array(d.getLength() - 1);
			for (p = 0; p < i[c].length; p++) {
				var v = p + g.getLength() - i[c].length;
				i[c][p] = v >= 0 ? g.get(v) : 0
			}
		}
		var m = 0;
		for (p = 0; p < t.length; p++) m += t[p].totalCount;
		var y = new Array(m),
			b = 0;
		for (p = 0; p < n; p++)
			for (c = 0; c < t.length; c++) p < a[c].length && (y[b++] = a[c][p]);
		for (p = 0; p < o; p++)
			for (c = 0; c < t.length; c++) p < i[c].length && (y[b++] = i[c][p]);
		return y
	};
	for (var o = {
			MODE_NUMBER: 1,
			MODE_ALPHA_NUM: 2,
			MODE_8BIT_BYTE: 4,
			MODE_KANJI: 8
		}, a = {
			L: 1,
			M: 0,
			Q: 3,
			H: 2
		}, i = {
			PATTERN000: 0,
			PATTERN001: 1,
			PATTERN010: 2,
			PATTERN011: 3,
			PATTERN100: 4,
			PATTERN101: 5,
			PATTERN110: 6,
			PATTERN111: 7
		}, s = {
			PATTERN_POSITION_TABLE: [
				[],
				[6, 18],
				[6, 22],
				[6, 26],
				[6, 30],
				[6, 34],
				[6, 22, 38],
				[6, 24, 42],
				[6, 26, 46],
				[6, 28, 50],
				[6, 30, 54],
				[6, 32, 58],
				[6, 34, 62],
				[6, 26, 46, 66],
				[6, 26, 48, 70],
				[6, 26, 50, 74],
				[6, 30, 54, 78],
				[6, 30, 56, 82],
				[6, 30, 58, 86],
				[6, 34, 62, 90],
				[6, 28, 50, 72, 94],
				[6, 26, 50, 74, 98],
				[6, 30, 54, 78, 102],
				[6, 28, 54, 80, 106],
				[6, 32, 58, 84, 110],
				[6, 30, 58, 86, 114],
				[6, 34, 62, 90, 118],
				[6, 26, 50, 74, 98, 122],
				[6, 30, 54, 78, 102, 126],
				[6, 26, 52, 78, 104, 130],
				[6, 30, 56, 82, 108, 134],
				[6, 34, 60, 86, 112, 138],
				[6, 30, 58, 86, 114, 142],
				[6, 34, 62, 90, 118, 146],
				[6, 30, 54, 78, 102, 126, 150],
				[6, 24, 50, 76, 102, 128, 154],
				[6, 28, 54, 80, 106, 132, 158],
				[6, 32, 58, 84, 110, 136, 162],
				[6, 26, 54, 82, 110, 138, 166],
				[6, 30, 58, 86, 114, 142, 170]
			],
			G15: 1335,
			G18: 7973,
			G15_MASK: 21522,
			getBCHTypeInfo: function(e) {
				var t = e << 10;
				while (s.getBCHDigit(t) - s.getBCHDigit(s.G15) >= 0) t ^= s.G15 << s.getBCHDigit(t) - s.getBCHDigit(s
					.G15);
				return (e << 10 | t) ^ s.G15_MASK
			},
			getBCHTypeNumber: function(e) {
				var t = e << 12;
				while (s.getBCHDigit(t) - s.getBCHDigit(s.G18) >= 0) t ^= s.G18 << s.getBCHDigit(t) - s.getBCHDigit(s
					.G18);
				return e << 12 | t
			},
			getBCHDigit: function(e) {
				var t = 0;
				while (0 != e) t++, e >>>= 1;
				return t
			},
			getPatternPosition: function(e) {
				return s.PATTERN_POSITION_TABLE[e - 1]
			},
			getMask: function(e, t, r) {
				switch (e) {
					case i.PATTERN000:
						return (t + r) % 2 == 0;
					case i.PATTERN001:
						return t % 2 == 0;
					case i.PATTERN010:
						return r % 3 == 0;
					case i.PATTERN011:
						return (t + r) % 3 == 0;
					case i.PATTERN100:
						return (Math.floor(t / 2) + Math.floor(r / 3)) % 2 == 0;
					case i.PATTERN101:
						return t * r % 2 + t * r % 3 == 0;
					case i.PATTERN110:
						return (t * r % 2 + t * r % 3) % 2 == 0;
					case i.PATTERN111:
						return (t * r % 3 + (t + r) % 2) % 2 == 0;
					default:
						throw new Error("bad maskPattern:" + e)
				}
			},
			getErrorCorrectPolynomial: function(e) {
				for (var t = new l([1], 0), r = 0; r < e; r++) t = t.multiply(new l([1, c.gexp(r)], 0));
				return t
			},
			getLengthInBits: function(e, t) {
				if (1 <= t && t < 10) switch (e) {
					case o.MODE_NUMBER:
						return 10;
					case o.MODE_ALPHA_NUM:
						return 9;
					case o.MODE_8BIT_BYTE:
						return 8;
					case o.MODE_KANJI:
						return 8;
					default:
						throw new Error("mode:" + e)
				} else if (t < 27) switch (e) {
					case o.MODE_NUMBER:
						return 12;
					case o.MODE_ALPHA_NUM:
						return 11;
					case o.MODE_8BIT_BYTE:
						return 16;
					case o.MODE_KANJI:
						return 10;
					default:
						throw new Error("mode:" + e)
				} else {
					if (!(t < 41)) throw new Error("type:" + t);
					switch (e) {
						case o.MODE_NUMBER:
							return 14;
						case o.MODE_ALPHA_NUM:
							return 13;
						case o.MODE_8BIT_BYTE:
							return 16;
						case o.MODE_KANJI:
							return 12;
						default:
							throw new Error("mode:" + e)
					}
				}
			},
			getLostPoint: function(e) {
				for (var t = e.getModuleCount(), r = 0, n = 0; n < t; n++)
					for (var o = 0; o < t; o++) {
						for (var a = 0, i = e.isDark(n, o), s = -1; s <= 1; s++)
							if (!(n + s < 0 || t <= n + s))
								for (var c = -1; c <= 1; c++) o + c < 0 || t <= o + c || 0 == s && 0 == c || i == e.isDark(n + s, o +
									c) && a++;
						a > 5 && (r += 3 + a - 5)
					}
				for (n = 0; n < t - 1; n++)
					for (o = 0; o < t - 1; o++) {
						var u = 0;
						e.isDark(n, o) && u++, e.isDark(n + 1, o) && u++, e.isDark(n, o + 1) && u++, e.isDark(n + 1, o + 1) &&
							u++, 0 != u && 4 != u || (r += 3)
					}
				for (n = 0; n < t; n++)
					for (o = 0; o < t - 6; o++) e.isDark(n, o) && !e.isDark(n, o + 1) && e.isDark(n, o + 2) && e.isDark(n,
						o + 3) && e.isDark(n, o + 4) && !e.isDark(n, o + 5) && e.isDark(n, o + 6) && (r += 40);
				for (o = 0; o < t; o++)
					for (n = 0; n < t - 6; n++) e.isDark(n, o) && !e.isDark(n + 1, o) && e.isDark(n + 2, o) && e.isDark(n +
						3, o) && e.isDark(n + 4, o) && !e.isDark(n + 5, o) && e.isDark(n + 6, o) && (r += 40);
				var l = 0;
				for (o = 0; o < t; o++)
					for (n = 0; n < t; n++) e.isDark(n, o) && l++;
				var f = Math.abs(100 * l / t / t - 50) / 5;
				return r += 10 * f, r
			}
		}, c = {
			glog: function(e) {
				if (e < 1) throw new Error("glog(" + e + ")");
				return c.LOG_TABLE[e]
			},
			gexp: function(e) {
				while (e < 0) e += 255;
				while (e >= 256) e -= 255;
				return c.EXP_TABLE[e]
			},
			EXP_TABLE: new Array(256),
			LOG_TABLE: new Array(256)
		}, u = 0; u < 8; u++) c.EXP_TABLE[u] = 1 << u;
	for (u = 8; u < 256; u++) c.EXP_TABLE[u] = c.EXP_TABLE[u - 4] ^ c.EXP_TABLE[u - 5] ^ c.EXP_TABLE[u - 6] ^ c
		.EXP_TABLE[u - 8];
	for (u = 0; u < 255; u++) c.LOG_TABLE[c.EXP_TABLE[u]] = u;

	function l(e, t) {
		if (void 0 == e.length) throw new Error(e.length + "/" + t);
		var r = 0;
		while (r < e.length && 0 == e[r]) r++;
		this.num = new Array(e.length - r + t);
		for (var n = 0; n < e.length - r; n++) this.num[n] = e[n + r]
	}

	function f(e, t) {
		this.totalCount = e, this.dataCount = t
	}

	function p() {
		this.buffer = new Array, this.length = 0
	}

	function d(e) {
		for (var t, r = "", n = 0; n < e.length; n++) t = e.charCodeAt(n), t >= 1 && t <= 127 ? r += e.charAt(n) :
			t > 2047 ? (r += String.fromCharCode(224 | t >> 12 & 15), r += String.fromCharCode(128 | t >> 6 & 63), r +=
				String.fromCharCode(128 | t >> 0 & 63)) : (r += String.fromCharCode(192 | t >> 6 & 31), r += String
				.fromCharCode(128 | t >> 0 & 63));
		return r
	}
	l.prototype = {
		get: function(e) {
			return this.num[e]
		},
		getLength: function() {
			return this.num.length
		},
		multiply: function(e) {
			for (var t = new Array(this.getLength() + e.getLength() - 1), r = 0; r < this.getLength(); r++)
				for (var n = 0; n < e.getLength(); n++) t[r + n] ^= c.gexp(c.glog(this.get(r)) + c.glog(e.get(n)));
			return new l(t, 0)
		},
		mod: function(e) {
			if (this.getLength() - e.getLength() < 0) return this;
			for (var t = c.glog(this.get(0)) - c.glog(e.get(0)), r = new Array(this.getLength()), n = 0; n < this
				.getLength(); n++) r[n] = this.get(n);
			for (n = 0; n < e.getLength(); n++) r[n] ^= c.gexp(c.glog(e.get(n)) + t);
			return new l(r, 0).mod(e)
		}
	}, f.RS_BLOCK_TABLE = [
		[1, 26, 19],
		[1, 26, 16],
		[1, 26, 13],
		[1, 26, 9],
		[1, 44, 34],
		[1, 44, 28],
		[1, 44, 22],
		[1, 44, 16],
		[1, 70, 55],
		[1, 70, 44],
		[2, 35, 17],
		[2, 35, 13],
		[1, 100, 80],
		[2, 50, 32],
		[2, 50, 24],
		[4, 25, 9],
		[1, 134, 108],
		[2, 67, 43],
		[2, 33, 15, 2, 34, 16],
		[2, 33, 11, 2, 34, 12],
		[2, 86, 68],
		[4, 43, 27],
		[4, 43, 19],
		[4, 43, 15],
		[2, 98, 78],
		[4, 49, 31],
		[2, 32, 14, 4, 33, 15],
		[4, 39, 13, 1, 40, 14],
		[2, 121, 97],
		[2, 60, 38, 2, 61, 39],
		[4, 40, 18, 2, 41, 19],
		[4, 40, 14, 2, 41, 15],
		[2, 146, 116],
		[3, 58, 36, 2, 59, 37],
		[4, 36, 16, 4, 37, 17],
		[4, 36, 12, 4, 37, 13],
		[2, 86, 68, 2, 87, 69],
		[4, 69, 43, 1, 70, 44],
		[6, 43, 19, 2, 44, 20],
		[6, 43, 15, 2, 44, 16],
		[4, 101, 81],
		[1, 80, 50, 4, 81, 51],
		[4, 50, 22, 4, 51, 23],
		[3, 36, 12, 8, 37, 13],
		[2, 116, 92, 2, 117, 93],
		[6, 58, 36, 2, 59, 37],
		[4, 46, 20, 6, 47, 21],
		[7, 42, 14, 4, 43, 15],
		[4, 133, 107],
		[8, 59, 37, 1, 60, 38],
		[8, 44, 20, 4, 45, 21],
		[12, 33, 11, 4, 34, 12],
		[3, 145, 115, 1, 146, 116],
		[4, 64, 40, 5, 65, 41],
		[11, 36, 16, 5, 37, 17],
		[11, 36, 12, 5, 37, 13],
		[5, 109, 87, 1, 110, 88],
		[5, 65, 41, 5, 66, 42],
		[5, 54, 24, 7, 55, 25],
		[11, 36, 12],
		[5, 122, 98, 1, 123, 99],
		[7, 73, 45, 3, 74, 46],
		[15, 43, 19, 2, 44, 20],
		[3, 45, 15, 13, 46, 16],
		[1, 135, 107, 5, 136, 108],
		[10, 74, 46, 1, 75, 47],
		[1, 50, 22, 15, 51, 23],
		[2, 42, 14, 17, 43, 15],
		[5, 150, 120, 1, 151, 121],
		[9, 69, 43, 4, 70, 44],
		[17, 50, 22, 1, 51, 23],
		[2, 42, 14, 19, 43, 15],
		[3, 141, 113, 4, 142, 114],
		[3, 70, 44, 11, 71, 45],
		[17, 47, 21, 4, 48, 22],
		[9, 39, 13, 16, 40, 14],
		[3, 135, 107, 5, 136, 108],
		[3, 67, 41, 13, 68, 42],
		[15, 54, 24, 5, 55, 25],
		[15, 43, 15, 10, 44, 16],
		[4, 144, 116, 4, 145, 117],
		[17, 68, 42],
		[17, 50, 22, 6, 51, 23],
		[19, 46, 16, 6, 47, 17],
		[2, 139, 111, 7, 140, 112],
		[17, 74, 46],
		[7, 54, 24, 16, 55, 25],
		[34, 37, 13],
		[4, 151, 121, 5, 152, 122],
		[4, 75, 47, 14, 76, 48],
		[11, 54, 24, 14, 55, 25],
		[16, 45, 15, 14, 46, 16],
		[6, 147, 117, 4, 148, 118],
		[6, 73, 45, 14, 74, 46],
		[11, 54, 24, 16, 55, 25],
		[30, 46, 16, 2, 47, 17],
		[8, 132, 106, 4, 133, 107],
		[8, 75, 47, 13, 76, 48],
		[7, 54, 24, 22, 55, 25],
		[22, 45, 15, 13, 46, 16],
		[10, 142, 114, 2, 143, 115],
		[19, 74, 46, 4, 75, 47],
		[28, 50, 22, 6, 51, 23],
		[33, 46, 16, 4, 47, 17],
		[8, 152, 122, 4, 153, 123],
		[22, 73, 45, 3, 74, 46],
		[8, 53, 23, 26, 54, 24],
		[12, 45, 15, 28, 46, 16],
		[3, 147, 117, 10, 148, 118],
		[3, 73, 45, 23, 74, 46],
		[4, 54, 24, 31, 55, 25],
		[11, 45, 15, 31, 46, 16],
		[7, 146, 116, 7, 147, 117],
		[21, 73, 45, 7, 74, 46],
		[1, 53, 23, 37, 54, 24],
		[19, 45, 15, 26, 46, 16],
		[5, 145, 115, 10, 146, 116],
		[19, 75, 47, 10, 76, 48],
		[15, 54, 24, 25, 55, 25],
		[23, 45, 15, 25, 46, 16],
		[13, 145, 115, 3, 146, 116],
		[2, 74, 46, 29, 75, 47],
		[42, 54, 24, 1, 55, 25],
		[23, 45, 15, 28, 46, 16],
		[17, 145, 115],
		[10, 74, 46, 23, 75, 47],
		[10, 54, 24, 35, 55, 25],
		[19, 45, 15, 35, 46, 16],
		[17, 145, 115, 1, 146, 116],
		[14, 74, 46, 21, 75, 47],
		[29, 54, 24, 19, 55, 25],
		[11, 45, 15, 46, 46, 16],
		[13, 145, 115, 6, 146, 116],
		[14, 74, 46, 23, 75, 47],
		[44, 54, 24, 7, 55, 25],
		[59, 46, 16, 1, 47, 17],
		[12, 151, 121, 7, 152, 122],
		[12, 75, 47, 26, 76, 48],
		[39, 54, 24, 14, 55, 25],
		[22, 45, 15, 41, 46, 16],
		[6, 151, 121, 14, 152, 122],
		[6, 75, 47, 34, 76, 48],
		[46, 54, 24, 10, 55, 25],
		[2, 45, 15, 64, 46, 16],
		[17, 152, 122, 4, 153, 123],
		[29, 74, 46, 14, 75, 47],
		[49, 54, 24, 10, 55, 25],
		[24, 45, 15, 46, 46, 16],
		[4, 152, 122, 18, 153, 123],
		[13, 74, 46, 32, 75, 47],
		[48, 54, 24, 14, 55, 25],
		[42, 45, 15, 32, 46, 16],
		[20, 147, 117, 4, 148, 118],
		[40, 75, 47, 7, 76, 48],
		[43, 54, 24, 22, 55, 25],
		[10, 45, 15, 67, 46, 16],
		[19, 148, 118, 6, 149, 119],
		[18, 75, 47, 31, 76, 48],
		[34, 54, 24, 34, 55, 25],
		[20, 45, 15, 61, 46, 16]
	], f.getRSBlocks = function(e, t) {
		var r = f.getRsBlockTable(e, t);
		if (void 0 == r) throw new Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
		for (var n = r.length / 3, o = new Array, a = 0; a < n; a++)
			for (var i = r[3 * a + 0], s = r[3 * a + 1], c = r[3 * a + 2], u = 0; u < i; u++) o.push(new f(s, c));
		return o
	}, f.getRsBlockTable = function(e, t) {
		switch (t) {
			case a.L:
				return f.RS_BLOCK_TABLE[4 * (e - 1) + 0];
			case a.M:
				return f.RS_BLOCK_TABLE[4 * (e - 1) + 1];
			case a.Q:
				return f.RS_BLOCK_TABLE[4 * (e - 1) + 2];
			case a.H:
				return f.RS_BLOCK_TABLE[4 * (e - 1) + 3];
			default:
				return
		}
	}, p.prototype = {
		get: function(e) {
			var t = Math.floor(e / 8);
			return 1 == (this.buffer[t] >>> 7 - e % 8 & 1)
		},
		put: function(e, t) {
			for (var r = 0; r < t; r++) this.putBit(1 == (e >>> t - r - 1 & 1))
		},
		getLengthInBits: function() {
			return this.length
		},
		putBit: function(e) {
			var t = Math.floor(this.length / 8);
			this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this
				.length++
		}
	}, r = {
		defaults: {
			size: 258,
			margin: 0,
			backgroundColor: "#ffffff",
			foregroundColor: "#000000",
			fileType: "png",
			correctLevel: 3,
			typeNumber: -1
		},
		make: function(t) {
			var r = {
				canvasId: t.canvasId,
				componentInstance: t.componentInstance,
				text: t.text,
				size: this.defaults.size,
				margin: this.defaults.margin,
				backgroundColor: this.defaults.backgroundColor,
				foregroundColor: this.defaults.foregroundColor,
				fileType: this.defaults.fileType,
				correctLevel: this.defaults.correctLevel,
				typeNumber: this.defaults.typeNumber
			};
			if (t)
				for (var o in t) r[o] = t[o];

			function a() {
				var r = new n(t.typeNumber, t.correctLevel);
				r.addData(d(t.text)), r.make();
				var o = uni.createCanvasContext(t.canvasId, t.componentInstance);
				o.setFillStyle(t.backgroundColor), o.fillRect(0, 0, t.size, t.size);
				for (var a = (t.size - 2 * t.margin) / r.getModuleCount(), i = a, s = 0; s < r.getModuleCount(); s++)
					for (var c = 0; c < r.getModuleCount(); c++) {
						var u = r.isDark(s, c) ? t.foregroundColor : t.backgroundColor;
						o.setFillStyle(u);
						var l = Math.round(c * a) + t.margin,
							f = Math.round(s * i) + t.margin,
							p = Math.ceil((c + 1) * a) - Math.floor(c * a),
							h = Math.ceil((s + 1) * a) - Math.floor(s * a);
						o.fillRect(l, f, p, h)
					}
				setTimeout((function() {
					o.draw(!1, (function() {
						setTimeout((function() {
							uni.canvasToTempFilePath({
								canvasId: t.canvasId,
								fileType: t.fileType,
								width: t.size,
								height: t.size,
								destWidth: t.size,
								destHeight: t.size,
								success: function(e) {
									t.success && t.success(e.tempFilePath)
								},
								fail: function(e) {
									t.fail && t.fail(e)
								},
								complete: function(e) {
									t.complete && t.complete(e)
								}
							}, t.componentInstance)
						}), t.text.length + 100)
					}))
				}), 150)
			}
			t = r, t.canvasId ? a() : console.error("uQRCode: Please set canvasId!")
		}
	}
})();
export const UNICAVAS = r;