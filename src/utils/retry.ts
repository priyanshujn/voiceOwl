
export async function retry(fn: () => Promise<any>, retries = 3, baseDelay = 200): Promise<any> {
    let attempt = 0;
    while (true) {
        try {
            return await fn();
        } catch (err) {
            attempt++;
            if (attempt > retries) throw err;
            const delay = baseDelay * Math.pow(2, attempt - 1);
            await new Promise((res) => setTimeout(res, delay));
        }
    }
}
