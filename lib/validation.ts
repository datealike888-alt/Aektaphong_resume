export function isAssetPath(value: unknown, extension: 'pdf' | 'image' = 'pdf'): value is string {
  return typeof value === 'string' && value.startsWith('/assets/') && !/[\\?#%\x00-\x1f]/.test(value) && !value.split('/').slice(1).some(p => !p || p === '.' || p === '..') && (extension === 'pdf' ? /\.pdf$/i : /\.(png|jpe?g)$/i).test(value);
}
