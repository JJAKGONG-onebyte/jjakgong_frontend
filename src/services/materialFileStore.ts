// 학습 자료 파일 임시 보관소 (백엔드 업로드 API가 나오기 전까지 사용)
//
// 학습 시작 팝업에서 업로드한 파일을 브라우저 저장소(IndexedDB)에 넣어두고,
// 학습화면에서 자료 ID로 다시 꺼낸다. 주소 이동(페이지 새로고침)을 해도 파일이 남는다.
//
// TODO(백엔드 연동): 업로드 API가 나오면
//   - saveMaterialFile  → 업로드 API 호출 후 서버가 준 자료 ID 반환
//   - getMaterialFile   → 자료 파일 조회 API로 교체

const DB_NAME = "jjakgong";
const STORE_NAME = "materialFiles";
// 임시 저장이므로 오래된 파일은 지워서 브라우저 용량을 아낀다
const MAX_STORED_FILES = 5;

type StoredMaterialFile = {
  id: string;
  file: File;
  savedAt: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function runRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore<T>(mode: IDBTransactionMode, work: (store: IDBObjectStore) => Promise<T>): Promise<T> {
  const db = await openDb();
  try {
    return await work(db.transaction(STORE_NAME, mode).objectStore(STORE_NAME));
  } finally {
    db.close();
  }
}

/** 파일을 저장하고 자료 ID를 돌려준다. */
export async function saveMaterialFile(file: File): Promise<string> {
  const id = `local-${Date.now()}`;

  await withStore("readwrite", async (store) => {
    const item: StoredMaterialFile = { id, file, savedAt: Date.now() };
    await runRequest(store.put(item));

    // 가장 최근 MAX_STORED_FILES개만 남기기
    const all = await runRequest(store.getAll() as IDBRequest<StoredMaterialFile[]>);
    const old = all.sort((a, b) => b.savedAt - a.savedAt).slice(MAX_STORED_FILES);
    await Promise.all(old.map((item) => runRequest(store.delete(item.id))));
  });

  return id;
}

/** 자료 ID로 파일을 꺼낸다. 없으면 null (예: 목업 자료, 다른 브라우저, 저장소 삭제). */
export async function getMaterialFile(id: string): Promise<File | null> {
  try {
    const stored = await withStore("readonly", (store) =>
      runRequest(store.get(id) as IDBRequest<StoredMaterialFile | undefined>)
    );
    return stored?.file ?? null;
  } catch {
    // 시크릿 모드 등 저장소를 쓸 수 없는 환경
    return null;
  }
}
