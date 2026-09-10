export const getAssetUrl = (backendPath: string): string => {
  // 使用 glob 预加载所有 assets 资源（在构建时执行）
  const modules = import.meta.glob('@/assets/img/**/*', {
    eager: true,
    import: 'default'
  })
  // 将 @ 替换为 /src，使其与 glob 的 key 匹配
  const filePath = backendPath.replace('@', '/src')
  return modules[filePath] || ''
}