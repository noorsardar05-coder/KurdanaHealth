/**
 * MediaPipe Face Landmarker (IMAGE mode) — on-device facial landmarks.
 * Educational beauty guidance only — never medical diagnosis.
 */
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { publicHtmlUrl } from "../../../utils/publicHtmlUrl.js";

const LOCAL_WASM = () => publicHtmlUrl("mediapipe/wasm");
const LOCAL_MODEL = () => publicHtmlUrl("mediapipe/face_landmarker.task");
const CDN_WASM = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm";
const CDN_MODEL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

let landmarkerPromise = null;

async function createLandmarker(wasmRoot, modelUrl) {
  const vision = await FilesetResolver.forVisionTasks(wasmRoot);
  const options = {
    runningMode: "IMAGE",
    numFaces: 2,
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: true,
  };
  try {
    return await FaceLandmarker.createFromOptions(vision, {
      ...options,
      baseOptions: { modelAssetPath: modelUrl, delegate: "GPU" },
    });
  } catch {
    return FaceLandmarker.createFromOptions(vision, {
      ...options,
      baseOptions: { modelAssetPath: modelUrl, delegate: "CPU" },
    });
  }
}

export async function getFaceLandmarker() {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      try {
        return await createLandmarker(LOCAL_WASM(), LOCAL_MODEL());
      } catch (localErr) {
        console.warn("[beauty-cam] Local MediaPipe failed, trying CDN", localErr);
        return createLandmarker(CDN_WASM, CDN_MODEL);
      }
    })().catch((err) => {
      landmarkerPromise = null;
      throw err;
    });
  }
  return landmarkerPromise;
}

/** Warm the model when the analyzer opens (singleton — safe to call often). */
export function preloadFaceLandmarker() {
  return getFaceLandmarker().catch(() => null);
}

/** Landmark clusters for educational region sampling (MediaPipe Face Mesh indices). */
export const FACE_REGIONS = {
  forehead: [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109],
  foreheadCore: [10, 67, 69, 104, 108, 151, 337, 299, 333, 298, 301],
  leftCheek: [50, 101, 118, 119, 120, 100, 142, 203, 206, 207, 187, 123, 116, 117],
  rightCheek: [280, 330, 347, 348, 349, 329, 371, 423, 426, 427, 411, 352, 345, 346],
  noseTzone: [1, 2, 98, 327, 168, 6, 197, 195, 5, 4, 19, 94, 141, 275],
  underLeftEye: [110, 24, 23, 22, 26, 112, 243, 190, 56, 28, 27, 29, 30, 247],
  underRightEye: [339, 254, 253, 252, 256, 341, 463, 414, 286, 258, 257, 259, 260, 467],
  chin: [152, 377, 400, 378, 379, 365, 397, 288, 361, 323],
  leftEye: [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246],
  rightEye: [263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466],
  mouth: [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185],
};

export function landmarksBounds(landmarks) {
  let minX = 1;
  let minY = 1;
  let maxX = 0;
  let maxY = 0;
  for (const p of landmarks) {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}

export function estimateHeadPose(landmarks) {
  const nose = landmarks[1];
  const left = landmarks[234];
  const right = landmarks[454];
  const forehead = landmarks[10];
  const chin = landmarks[152];
  if (!nose || !left || !right || !forehead || !chin) {
    return { yaw: 0, pitch: 0, ok: false };
  }
  const midX = (left.x + right.x) / 2;
  const faceW = Math.max(0.001, right.x - left.x);
  const yaw = (nose.x - midX) / faceW;
  const midY = (forehead.y + chin.y) / 2;
  const faceH = Math.max(0.001, chin.y - forehead.y);
  const pitch = (nose.y - midY) / faceH;
  return { yaw, pitch, ok: true };
}

export async function detectFacesInImage(imageSource) {
  const landmarker = await getFaceLandmarker();
  const result = landmarker.detect(imageSource);
  const faces = result?.faceLandmarks || [];
  const matrices = result?.facialTransformationMatrixes || [];
  return {
    faceCount: faces.length,
    faces,
    matrices,
    primary: faces[0] || null,
  };
}
